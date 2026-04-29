import { Router } from "express";
import pool from "../db/pool.js";

const router = Router();

router.post("/adoption", async (req, res) => {
    const petId = Number(req.body?.petId);
    const customerId = Number(req.body?.customerId);
    const fullName = String(req.body?.fullName || "").trim();
    const email = String(req.body?.email || "").trim();

    if (!Number.isInteger(petId) || !Number.isInteger(customerId)) {
        return res.status(400).json({
            message: "Valid numeric petId and customerId are required.",
        });
    }

    try {
        const [[pet]] = await pool.query(
            "SELECT petID FROM Pet WHERE petID = ? LIMIT 1",
            [petId]
        );

        if (!pet) {
            return res.status(400).json({
                message: "Selected pet does not exist.",
            });
        }

        const [[customer]] = await pool.query(
            "SELECT customerID FROM Customer WHERE customerID = ? LIMIT 1",
            [customerId]
        );

        if (!customer) {
            const [firstNameRaw, ...lastNameParts] = fullName.split(/\s+/).filter(Boolean);
            const firstName = (firstNameRaw || "Guest").slice(0, 20);
            const lastName = (lastNameParts.join(" ") || "User").slice(0, 20);
            const customerEmail = (email || `customer${customerId}@petadoption.local`).slice(0, 100);

            await pool.query(
                `INSERT INTO Customer (customerID, Fname, Lname, email, address, phoneNumber)
                 VALUES (?, ?, ?, ?, 'N/A', 'N/A')`,
                [customerId, firstName, lastName, customerEmail]
            );
        }

        const [result] = await pool.query(
            `INSERT INTO AppliesForAdoption (petID, customerID, status, applicationType)
             VALUES (?, ?, 'Pending', 'adoption')`,
            [petId, customerId]
        );

        return res.status(201).json({
            message: "Adoption application created.",
            applicationId: result.insertId,
        });
    } catch (error) {
        if (error?.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                message: "Invalid petId or customerId for application.",
            });
        }

        return res.status(500).json({
            message: "Unable to create adoption application.",
            details: error.message,
        });
    }
});

router.post("/foster", async (req, res) => {
    const petId = Number(req.body?.petId);
    const customerId = Number(req.body?.customerId);
    const fullName = String(req.body?.fullName || "").trim();
    const email = String(req.body?.email || "").trim();

    if (!Number.isInteger(petId) || !Number.isInteger(customerId)) {
        return res.status(400).json({
            message: "Valid numeric petId and customerId are required.",
        });
    }

    try {
        const [[pet]] = await pool.query(
            "SELECT petID FROM Pet WHERE petID = ? LIMIT 1",
            [petId]
        );

        if (!pet) {
            return res.status(400).json({
                message: "Selected pet does not exist.",
            });
        }

        const [[customer]] = await pool.query(
            "SELECT customerID FROM Customer WHERE customerID = ? LIMIT 1",
            [customerId]
        );

        if (!customer) {
            const [firstNameRaw, ...lastNameParts] = fullName.split(/\s+/).filter(Boolean);
            const firstName = (firstNameRaw || "Guest").slice(0, 20);
            const lastName = (lastNameParts.join(" ") || "User").slice(0, 20);
            const customerEmail = (email || `customer${customerId}@petadoption.local`).slice(0, 100);

            await pool.query(
                `INSERT INTO Customer (customerID, Fname, Lname, email, address, phoneNumber)
                 VALUES (?, ?, ?, ?, 'N/A', 'N/A')`,
                [customerId, firstName, lastName, customerEmail]
            );
        }

        const [result] = await pool.query(
            `INSERT INTO AppliesForAdoption (petID, customerID, status, applicationType)
             VALUES (?, ?, 'Pending', 'foster')`,
            [petId, customerId]
        );

        return res.status(201).json({
            message: "Foster application created.",
            applicationId: result.insertId,
        });
    } catch (error) {
        if (error?.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                message: "Invalid petId or customerId for application.",
            });
        }

        return res.status(500).json({
            message: "Unable to create foster application.",
            details: error.message,
        });
    }
});

router.get("/", async (_req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT
                a.applicationID AS application_id,
                a.petID AS pet_id,
                a.customerID AS customer_id,
                a.status,
                a.applicationType AS application_type,
                p.petName AS pet_name,
                c.Fname AS customer_fname,
                c.Lname AS customer_lname,
                c.email AS customer_email
             FROM AppliesForAdoption a
             INNER JOIN Pet p ON p.petID = a.petID
             INNER JOIN Customer c ON c.customerID = a.customerID
             ORDER BY a.applicationID DESC`
        );

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            message: "Unable to load applications.",
            details: error.message,
        });
    }
});

router.patch("/:applicationId/status", async (req, res) => {
    const applicationId = Number(req.params?.applicationId);
    const status = String(req.body?.status || "").trim();

    if (!Number.isInteger(applicationId)) {
        return res.status(400).json({
            message: "Valid applicationId is required.",
        });
    }

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
        return res.status(400).json({
            message: "Status must be Pending, Approved, or Rejected.",
        });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [applicationRows] = await connection.query(
            `SELECT applicationID, petID, customerID, status, applicationType
             FROM AppliesForAdoption
             WHERE applicationID = ?
             LIMIT 1`,
            [applicationId]
        );

        const application = applicationRows[0];

        if (!application) {
            await connection.rollback();
            return res.status(404).json({
                message: "Application not found.",
            });
        }

        const previousStatus = application.status;
        const petId = application.petID;
        const customerId = application.customerID;
        const applicationType = application.applicationType;
        await connection.query(
            "UPDATE AppliesForAdoption SET status = ? WHERE applicationID = ?",
            [status, applicationId]
        );

        if (status === "Approved" && application.applicationType === "adoption") {
            await connection.query(
                `INSERT INTO Adoption (petID, customerID, feePaid, adoptionDate)
                 SELECT ?, ?, 0.00, NOW()
                 FROM DUAL
                 WHERE NOT EXISTS (
                    SELECT 1
                    FROM Adoption
                    WHERE petID = ? AND customerID = ?
                 )`,
                [petId, customerId, petId, customerId]
            );

            await connection.query(
                "UPDATE Pet SET status = 'Adopted' WHERE petID = ?",
                [petId]
            );

            await connection.query(
                `UPDATE AppliesForAdoption
                 SET status = 'Rejected'
                 WHERE petID = ?
                   AND applicationID <> ?
                   AND status = 'Pending'`,
                [petId, applicationId]
            );
        }

        if (status === "Approved" && application.applicationType === "foster") {
            await connection.query(
                `INSERT INTO Foster (petID, customerID, startDate, endDate)
                 SELECT ?, ?, CURDATE(), NULL
                 FROM DUAL
                 WHERE NOT EXISTS (
                    SELECT 1
                    FROM Foster
                    WHERE petID = ? AND customerID = ?
                 )`,
                [petId, customerId, petId, customerId]
            );

            await connection.query(
                "UPDATE Pet SET status = 'Fostered' WHERE petID = ?",
                [petId]
            );

            await connection.query(
                `UPDATE AppliesForAdoption
                 SET status = 'Rejected'
                 WHERE petID = ?
                   AND applicationID <> ?
                   AND applicationType = 'foster'
                   AND status = 'Pending'`,
                [petId, applicationId]
            );
        }

        const revertingApproved =
            previousStatus === "Approved" && (status === "Pending" || status === "Rejected");

        if (revertingApproved && application.applicationType === "adoption") {
            await connection.query(
                "DELETE FROM Adoption WHERE petID = ? AND customerID = ?",
                [petId, customerId]
            );

            const [remainingApprovedRows] = await connection.query(
                `SELECT 1
                 FROM AppliesForAdoption
                 WHERE petID = ?
                   AND status = 'Approved'
                 LIMIT 1`,
                [petId]
            );

            if (remainingApprovedRows.length === 0) {
                await connection.query(
                    "UPDATE Pet SET status = 'Sheltered' WHERE petID = ?",
                    [petId]
                );
            }
        }

        if (revertingApproved && application.applicationType === "foster") {
            await connection.query(
                "DELETE FROM Foster WHERE petID = ? AND customerID = ?",
                [petId, customerId]
            );

            const [remainingApprovedRows] = await connection.query(
                `SELECT 1
                 FROM AppliesForAdoption
                 WHERE petID = ?
                   AND status = 'Approved'
                 LIMIT 1`,
                [petId]
            );

            if (remainingApprovedRows.length === 0) {
                await connection.query(
                    "UPDATE Pet SET status = 'Sheltered' WHERE petID = ?",
                    [petId]
                );
            }
        }

        await connection.commit();
        return res.status(200).json({
            message: "Application status updated.",
        });
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        return res.status(500).json({
            message: "Unable to update application status.",
            details: error.message,
        });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

export default router;

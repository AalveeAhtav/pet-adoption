import { Router } from "express";
import pool from "../db/pool.js";

const router = Router();

router.post("/adoption", async (req, res) => {
    const { petId, customerId } = req.body;

    if (!petId || !customerId) {
        return res.status(400).json({
            message: "petId and customerId are required.",
        });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO AppliesForAdoption (petID, customerID, status)
             VALUES (?, ?, 'Pending')`,
            [petId, customerId]
        );

        return res.status(201).json({
            message: "Adoption application created.",
            applicationId: result.insertId,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to create adoption application.",
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

export default router;

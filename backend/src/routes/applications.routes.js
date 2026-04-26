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
        const [statusRows] = await pool.query(
            "SELECT status_id FROM application_status WHERE status_name = 'Pending' LIMIT 1"
        );

        if (!statusRows.length) {
            return res.status(500).json({
                message: "Missing required status row: Pending",
            });
        }

        const pendingStatusId = statusRows[0].status_id;

        const [result] = await pool.query(
            `INSERT INTO applies_for_adoption (pet_id, customer_id, status_id)
             VALUES (?, ?, ?)`,
            [petId, customerId, pendingStatusId]
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
                a.application_id,
                a.pet_id,
                a.customer_id,
                s.status_name,
                a.applied_at
             FROM applies_for_adoption a
             INNER JOIN application_status s ON s.status_id = a.status_id
             ORDER BY a.application_id DESC`
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

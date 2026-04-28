import { Router } from "express";
import pool from "../db/pool.js";

const router = Router();

router.get("/", async (_req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT
                petID AS pet_id,
                petName AS pet_name,
                species,
                breed,
                age,
                arrivalDate AS arrival_date,
                status
             FROM Pet
             ORDER BY petID DESC`
        );

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            message: "Unable to load pets from database.",
            details: error.message,
        });
    }
});

export default router;

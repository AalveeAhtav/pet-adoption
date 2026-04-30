import { Router } from "express";
import pool from "../db/pool.js";

const router = Router();

router.post("/forgot-password", async (req, res) => {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const newPassword = String(req.body?.newPassword || "").trim();

    if (!email) {
        return res.status(400).json({
            message: "Email and new password are required.",
        });
    }

    try {
// VULNERABLE: Direct string concatenation
        const sql = "UPDATE Customer SET password = '" + newPassword + "' WHERE email = '" + email + "'";
        
// This line actually sends the dangerous string to your DB
        const [result] = await pool.query(sql);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No account found with that email.",
            });
        }

        return res.status(200).json({
            message: "Password reset successful.",
        });
    } catch (_error) {
        return res.status(500).json({
            message: "Unable to reset password.",
        });
    }
});

export default router;

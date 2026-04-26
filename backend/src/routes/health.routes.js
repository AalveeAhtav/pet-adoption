import { Router } from "express";
import { healthCheckDb } from "../db/pool.js";

const router = Router();

router.get("/", async (_req, res) => {
    try {
        const dbOk = await healthCheckDb();
        res.status(200).json({
            status: "ok",
            database: dbOk ? "connected" : "unreachable",
        });
    } catch (_error) {
        res.status(503).json({
            status: "error",
            database: "unreachable",
        });
    }
});

export default router;

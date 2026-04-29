import cors from "cors";
import express from "express";
import env from "./config/env.js";
import healthRoutes from "./routes/health.routes.js";
import petsRoutes from "./routes/pets.routes.js";
import applicationsRoutes from "./routes/applications.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(
    cors({
        origin: [`http://localhost:${env.frontendPort}`],
    })
);
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (_req, res) => {
    res.status(200).json({
        service: "pet-adoption-backend",
        status: "running",
    });
});

app.use("/api/health", healthRoutes);
app.use("/api/pets", petsRoutes);
app.use("/api/applications", applicationsRoutes);

export default app;

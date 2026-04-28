import cors from "cors";
import express from "express";
import env from "./config/env.js";
import healthRoutes from "./routes/health.routes.js";
import petsRoutes from "./routes/pets.routes.js";
import applicationsRoutes from "./routes/applications.routes.js";

const app = express();

app.use(
    cors({
        origin: [`http://localhost:${env.frontendPort}`],
    })
);
app.use(express.json());

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

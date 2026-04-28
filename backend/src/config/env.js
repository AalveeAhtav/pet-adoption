import dotenv from "dotenv";

dotenv.config();

const env = {
    nodeEnv: process.env.NODE_ENV || "development",
    frontendPort: Number(process.env.FRONTEND_PORT || 5173),
    backendPort: Number(process.env.BACKEND_PORT || 5000),
    dbHost: process.env.DB_HOST || "127.0.0.1",
    dbPort: Number(process.env.DB_PORT || 3306),
    dbName: process.env.DB_NAME || "AnimalShelter",
    dbUser: process.env.DB_USER || "root",
    dbPassword: process.env.DB_PASSWORD || "",
};

export default env;

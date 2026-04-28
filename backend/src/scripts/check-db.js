import { healthCheckDb } from "../db/pool.js";

try {
    const ok = await healthCheckDb();
    if (ok) {
        console.log("Database connection OK.");
        process.exit(0);
    }

    console.error("Database check failed.");
    process.exit(1);
} catch (error) {
    console.error(`Database check failed: ${error.message}`);
    process.exit(1);
}

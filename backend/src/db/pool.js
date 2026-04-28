import mysql from "mysql2/promise";
import env from "../config/env.js";

const pool = mysql.createPool({
    host: env.dbHost,
    port: env.dbPort,
    user: env.dbUser,
    password: env.dbPassword,
    database: env.dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export async function healthCheckDb() {
    const [rows] = await pool.query("SELECT 1 AS ok");
    return rows[0]?.ok === 1;
}

export default pool;

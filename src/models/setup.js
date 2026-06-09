import db from "./db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupDatabase = async () => {
    const schemaPath = path.join(__dirname, "sql", "schema.sql");
    const schemaSQL = fs.readFileSync(schemaPath, "utf8");

    await db.query(schemaSQL);

    console.log("Database schema initialized");
};

const testConnection = async () => {
    const result = await db.query("SELECT NOW() AS current_time");
    console.log("Database connection successful:", result.rows[0].current_time);
};

export { setupDatabase, testConnection };
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import session from "express-session";
import connectPgSimple from "connect-pg-simple";

import { setupDatabase, testConnection } from "./src/models/setup.js";
import router from "./src/routes/index.js";
import db from "./src/models/db.js";

import flash from "./src/middleware/flash.js";
import errorHandler from "./src/middleware/errorHandler.js";

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PgSession = connectPgSimple(session);

/*
 * Required for Render
 */
app.set("trust proxy", 1);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        store: new PgSession({
            pool: db,
            tableName: "session",
            createTableIfMissing: true
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: NODE_ENV === "production",
            httpOnly: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        }
    })
);

app.use(flash);

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/", router);

/*
 * Global error handler
 */
app.use(errorHandler);

app.listen(PORT, async () => {
    await setupDatabase();
    await testConnection();

    console.log(`Server running on port ${PORT}`);
});
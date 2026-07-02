import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import session from "express-session";
import connectPgSimple from "connect-pg-simple";

import { setupDatabase, testConnection } from "./src/models/setup.js";
import authRoutes from "./src/routes/auth.js";
import questRoutes from "./src/routes/quests.js";
import requestRoutes from "./src/routes/requests.js";
import dashboardRoutes from "./src/routes/dashboard.js";
import db from "./src/models/db.js";
import flash from "./src/middleware/flash.js";

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PgSession = connectPgSimple(session);

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

app.use("/", authRoutes);
app.use("/", questRoutes);
app.use("/", requestRoutes);
app.use("/", dashboardRoutes);

// Home
app.get("/", (req, res) => {
    res.render("index", {
        title: "Emberhold Quest Portal"
    });
});

// About
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Emberhold"
    });
});

app.listen(PORT, async () => {
    await setupDatabase();
    await testConnection();

    console.log(`Server running at http://localhost:${PORT}`);
});
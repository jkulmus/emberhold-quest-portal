import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { setupDatabase, testConnection } from "./src/models/setup.js";
import authRoutes from "./src/routes/auth.js";

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/", authRoutes);

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

// Login placeholder
app.get("/login", (req, res) => {
    res.render("auth/login", {
        title: "Guild Login"
    });
});

app.listen(PORT, async () => {
    await setupDatabase();
    await testConnection();

    console.log(`Server running at http://localhost:${PORT}`);
});
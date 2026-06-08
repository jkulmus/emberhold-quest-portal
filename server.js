import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

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

// Register
app.get("/register", (req, res) => {
    res.render("auth/register", {
        title: "Join the Guild"
    });
});

// Login
app.get("/login", (req, res) => {
    res.render("auth/login", {
        title: "Guild Login"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
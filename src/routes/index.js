import { Router } from "express";

import authRoutes from "./auth.js";
import questRoutes from "./quests.js";
import requestRoutes from "./requests.js";
import dashboardRoutes from "./dashboard.js";

const router = Router();

// Home
router.get("/", (req, res) => {
    res.render("index", {
        title: "Emberhold Quest Portal"
    });
});

// About
router.get("/about", (req, res) => {
    res.render("about", {
        title: "About Emberhold"
    });
});

router.use("/", authRoutes);
router.use("/", questRoutes);
router.use("/", requestRoutes);
router.use("/", dashboardRoutes);

export default router;
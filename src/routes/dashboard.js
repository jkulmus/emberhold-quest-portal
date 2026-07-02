import { Router } from "express";
import { dashboardPage } from "../controllers/dashboard/dashboard.js";

const router = Router();

router.get("/dashboard", dashboardPage);

export default router;
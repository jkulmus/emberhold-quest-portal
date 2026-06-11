import { Router } from "express";
import { questListPage } from "../controllers/quests/quests.js";

const router = Router();

router.get("/quests", questListPage);

export default router;
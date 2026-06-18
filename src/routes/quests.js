import { Router } from "express";
import {
    questListPage,
    questDetailPage,
    showCreateQuestForm,
    processCreateQuest,
    showEditQuestForm,
    processEditQuest,
    processDeleteQuest
} from "../controllers/quests/quests.js";

import { requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/quests", questListPage);
router.get("/quests/new", requireRole("staff", "admin"), showCreateQuestForm);
router.post("/quests", requireRole("staff", "admin"), processCreateQuest);

router.get("/quests/:id/edit", requireRole("staff", "admin"), showEditQuestForm);
router.post("/quests/:id/edit", requireRole("staff", "admin"), processEditQuest);

router.post("/quests/:id/delete", requireRole("staff", "admin"), processDeleteQuest);

router.get("/quests/:id", questDetailPage);

export default router;
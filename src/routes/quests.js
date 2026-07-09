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

router.get("/quests/new", requireRole("admin"), showCreateQuestForm);
router.post("/quests", requireRole("admin"), processCreateQuest);

router.get("/quests/:id/edit", requireRole("admin"), showEditQuestForm);
router.post("/quests/:id/edit", requireRole("admin"), processEditQuest);

router.post("/quests/:id/delete", requireRole("admin"), processDeleteQuest);

router.get("/quests/:id", questDetailPage);

export default router;
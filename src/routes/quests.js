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

import { questRules } from "../middleware/questValidation.js";

const router = Router();

router.get("/quests", questListPage);

router.get("/quests/new", requireRole("admin"), showCreateQuestForm);
router.post("/quests", requireRole("admin"), questRules, processCreateQuest);

router.get("/quests/:id/edit", requireRole("admin"), showEditQuestForm);
router.post("/quests/:id/edit", requireRole("admin"), questRules, processEditQuest);

router.post("/quests/:id/delete", requireRole("admin"), processDeleteQuest);

router.get("/quests/:id", questDetailPage);

export default router;
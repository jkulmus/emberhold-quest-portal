import { Router } from "express";
import {
    questListPage,
    questDetailPage,
    showCreateQuestForm,
    processCreateQuest,
    showEditQuestForm,
    processEditQuest
} from "../controllers/quests/quests.js";

const router = Router();

router.get("/quests", questListPage);
router.get("/quests/new", showCreateQuestForm);
router.post("/quests", processCreateQuest);

router.get("/quests/:id/edit", showEditQuestForm);
router.post("/quests/:id/edit", processEditQuest);

router.get("/quests/:id", questDetailPage);

export default router;
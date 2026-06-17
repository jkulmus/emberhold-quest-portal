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

const router = Router();

router.get("/quests", questListPage);
router.get("/quests/new", showCreateQuestForm);
router.post("/quests", processCreateQuest);

router.get("/quests/:id/edit", showEditQuestForm);
router.post("/quests/:id/edit", processEditQuest);

router.post("/quests/:id/delete", processDeleteQuest);

router.get("/quests/:id", questDetailPage);

export default router;
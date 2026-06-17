import { Router } from "express";
import {
    questListPage,
    questDetailPage,
    showCreateQuestForm,
    processCreateQuest
} from "../controllers/quests/quests.js";

const router = Router();

router.get("/quests", questListPage);
router.get("/quests/new", showCreateQuestForm);
router.post("/quests", processCreateQuest);
router.get("/quests/:id", questDetailPage);

export default router;
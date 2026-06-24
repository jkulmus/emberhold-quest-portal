import { Router } from "express";

import {
    requestQuest,
    myQuestRequestsPage
} from "../controllers/requests/requests.js";

import {
    manageQuestRequestsPage,
    updateQuestRequest
} from "../controllers/requests/admin.js";

import { requireLogin, requireRole } from "../middleware/auth.js";

const router = Router();

router.post("/quests/:id/request", requireLogin, requestQuest);
router.get("/my-quests", requireLogin, myQuestRequestsPage);

router.get("/requests", requireRole("staff", "admin"), manageQuestRequestsPage);
router.post("/requests/:id/status", requireRole("staff", "admin"), updateQuestRequest);

export default router;
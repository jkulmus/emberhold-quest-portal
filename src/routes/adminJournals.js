import { Router } from "express";

import {
    manageJournalsPage,
    deleteJournal
} from "../controllers/admin/journals.js";

import { requireRole } from "../middleware/auth.js";

const router = Router();

router.get(
    "/admin/journals",
    requireRole("admin"),
    manageJournalsPage
);

router.post(
    "/admin/journals/:id/delete",
    requireRole("admin"),
    deleteJournal
);

export default router;
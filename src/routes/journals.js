import { Router } from "express";

import {
    showCreateJournalForm,
    processCreateJournal,
    showEditJournalForm,
    processEditJournal,
    processDeleteJournal
} from "../controllers/journals/journals.js";

import { requireLogin } from "../middleware/auth.js";

const router = Router();

router.get("/journals/request/:requestId/new", requireLogin, showCreateJournalForm);
router.post("/journals/request/:requestId", requireLogin, processCreateJournal);

router.get("/journals/request/:requestId/edit", requireLogin, showEditJournalForm);
router.post("/journals/:journalId/edit", requireLogin, processDeleteJournal);

export default router;
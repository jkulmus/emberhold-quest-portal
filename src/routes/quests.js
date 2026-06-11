import { Router } from "express";
import { 
    questListPage,
    questDetailPage
} from "../controllers/quests/quests.js";

const router = Router();

router.get("/quests", questListPage);
router.get("/quests/:id", questDetailPage);

export default router;
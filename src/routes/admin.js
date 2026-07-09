import { Router } from "express";

import {
    manageUsersPage,
    processRoleUpdate
} from "../controllers/admin/users.js";

import { requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/admin/users", requireRole("admin"), manageUsersPage);
router.post("/admin/users/:id/role", requireRole("admin"), processRoleUpdate);

export default router;
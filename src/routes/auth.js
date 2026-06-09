import { Router } from "express";
import {
    showRegisterForm,
    processRegistration
} from "../controllers/auth/registration.js";
import { registrationValidation } from "../middleware/validation/auth.js";

const router = Router();

router.get("/register", showRegisterForm);
router.post("/register", registrationValidation, processRegistration);

export default router;
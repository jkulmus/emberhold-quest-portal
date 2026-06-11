import { Router } from "express";

import {
    showRegisterForm,
    processRegistration
} from "../controllers/auth/registration.js";

import {
    showLoginForm,
    processLogin,
    processLogout
} from "../controllers/auth/login.js";

import {
    registrationValidation,
    loginValidation
} from "../middleware/validation/auth.js";

const router = Router();

router.get("/register", showRegisterForm);
router.post("/register", registrationValidation, processRegistration);

router.get("/login", showLoginForm);
router.post("/login", loginValidation, processLogin);

router.get("/logout", processLogout);

export default router;
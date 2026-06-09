import { body } from "express-validator";

const registrationValidation = [
    body("name")
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters")
        .matches(/^[a-zA-Z\s'-]+$/)
        .withMessage("Name can only contain letters, spaces, hyphens, and apostrophes"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail()
        .isLength({ max: 255 })
        .withMessage("Email address is too long"),

    body("password")
        .isLength({ min: 8, max: 128 })
        .withMessage("Password must be between 8 and 128 characters")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
];

export { registrationValidation };
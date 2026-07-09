import { body } from "express-validator";

const journalRules = [
    body("rating")
        .isIn({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

    body("entry")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Journal entry must be at least 5 characters")
];

export { journalRules };
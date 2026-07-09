import { body } from "express-validator";

const questRules = [
    body("title")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Quest title must be at least 3 characters"),
    
    body("description")
        .trim()
        .isLength({ min: 10 })
        .withMessage("Quest description must be at least 10 characters"),

    body("difficulty")
        .isIn(["Beginner", "Intermediate", "Advanced", "Legendary"])
        .withMessage("Please choose a valid difficulty"),

    body("reward")
        .trim()
        .isLength({ min: 2 })
        .withMessage("Reward must be at least 2 characters"),

    body("duration_minutes")
        .isIn({ min: 1 })
        .withMessage("Duration must be at least 1 minute"),

    body("max_party_size")
        .isIn({ min: 1 })
        .withMessage("Max party size must be at least 1")
];

export { questRules };
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../../models/userModel.js";

const showRegisterForm = (req, res) => {
    res.render("auth/register", {
        title: "Join the Guild"
    });
};

const processRegistration = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash("error", error.msg);
        });

        return res.redirect("/register");
    }

    const { name, email, password } = req.body;

    try {
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            req.flash("warning", "A guild member with that email already exists.");
            return res.redirect("/register");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await createUser(name, email, hashedPassword);

        req.flash("success", "Welcome to the Guild! Your account has been created.");
        res.redirect("/login");
    } catch (error) {
        console.error(error);

        req.flash("error", "Unable to create your guild account. Please try again.");
        res.redirect("/register");
    }
};

export {
    showRegisterForm,
    processRegistration
};
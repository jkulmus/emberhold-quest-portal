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
            console.error(error.msg);
        });

        return res.redirect("/register");
    }

    const { name, email, password } = req.body;

    try {
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            console.error("Email already registered");
            return res.redirect("/register");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await createUser(name, email, hashedPassword);

        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.redirect("/register");
    }
};

export {
    showRegisterForm,
    processRegistration
};
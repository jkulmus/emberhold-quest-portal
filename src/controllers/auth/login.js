import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { getUserByEmailWithRole } from "../../models/userModel.js";

const showLoginForm = (req, res) => {
    res.render("auth/login", {
        title: "Guild Login"
    });
};

const processLogin = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash("error", error.msg);
        });

        return res.redirect("/login");
    }

    const { email, password } = req.body;

    try {
        const user = await getUserByEmailWithRole(email);

        if (!user) {
            req.flash("error", "Invalid email or password");
            return res.redirect("/login");
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            req.flash("error", "Invalid email or password");
            return res.redirect("/login");
        }

        delete user.password;

        req.session.user = user;

        req.flash("success", `Welcome back, ${user.name}!`);
        res.redirect("/dashboard");
    } catch (error) {
        console.error("Login error:", error);

        req.flash("error", "Unable to enter the guild hall. Please try again");
        res.redirect("/login");
    }
};

const processLogout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Logout error:", error);
            return res.redirect("/dashboard");
        }

        res.clearCookie("connect.sid");
        res.redirect("/");
    });
};

export {
    showLoginForm,
    processLogin,
    processLogout
};
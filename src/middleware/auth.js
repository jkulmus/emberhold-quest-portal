const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }

    req.flash("warning", "Please log in to continue");
    res.redirect("/login");
};

const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.session?.user;

        if (!user) {
            req.flash("warning", "Please log in to continue");
            return res.redirect("/login");
        }

        if (!allowedRoles.includes(user.role_name)) {
            req.flash("error", "You do not have permission to access that page");
            return res.redirect("/quests");
        }

        next();
    };
};

export {
    requireLogin,
    requireRole
};
import {
    getUserQuestStats,
    getRecentUserRequests
} from "../../models/dashboard/dashboard.js";

const dashboardPage = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect("/login");
        }

        const stats = await getUserQuestStats(req.session.user.id);
        const recentRequests = await getRecentUserRequests(req.session.user.id);

        res.render("dashboard", {
            title: "Guild Hall Dashboard",
            user: req.session.user,
            stats,
            recentRequests
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).send("Unable to load dashboard.");
    }
};

export { dashboardPage };
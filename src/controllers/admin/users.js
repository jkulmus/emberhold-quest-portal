import {
    getAllUsersWithRoles,
    updateUserRole
} from "../../models/userModel.js";

const manageUsersPage = async (req, res) => {
    try {
        const users = await getAllUsersWithRoles();

        res.render("admin/users", {
            title: "Manage Guild Members",
            users
        });
    } catch (error) {
        console.error("Error loading users:", error);
        res.status(500).send("Unable to load guild members")
    }
};

const processRoleUpdate = async (req, res) => {
    try {
        await updateUserRole(req.params.id, req.body.role);

        req.flash("success", "Guild member role updated");
        res.redirect("/admin/users");
    } catch (error) {
        console.error("Error updating user role:", error);

        req.flash("error", "Unable to update guild member role");
        res.redirect("/admin/users");
    }
};

export {
    manageUsersPage,
    processRoleUpdate
};

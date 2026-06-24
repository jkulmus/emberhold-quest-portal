import {
    getAllQuestRequests,
    updateQuestRequestStatus
} from "../../models/reservations/reservations.js";

const manageQuestRequestsPage = async (req, res) => {
    try {
        const requests = await getAllQuestRequests();

        res.render("requests/manage", {
            title: "Manage Quest Requests",
            requests
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to load quest requests.");
    }
};

const updateQuestRequest = async (req, res) => {
    try {
        await updateQuestRequestStatus(
            req.params.id,
            req.body.status
        );

        req.flash("success", "Quest request updated.");
        res.redirect("/requests");
    } catch (error) {
        console.error(error);

        req.flash("error", "Unable to update quest request.");
        res.redirect("/requests");
    }
};

export {
    manageQuestRequestsPage,
    updateQuestRequest
};
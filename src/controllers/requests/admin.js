import {
    getAllQuestRequests,
    updateQuestRequestStatus,
    VALID_REQUEST_STATUSES
} from "../../models/reservations/reservations.js";

const manageQuestRequestsPage = async (req, res) => {
    try {
        const requests = await getAllQuestRequests();

        res.render("requests/manage", {
            title: "Manage Quest Requests",
            requests,
            statuses: VALID_REQUEST_STATUSES
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to load quest requests.");
    }
};

const updateQuestRequest = async (req, res) => {
    try {
        const updatedRequest = await updateQuestRequestStatus(
            req.params.id,
            req.body.status
        );

        if (!updatedRequest) {
            req.flash("error", "Quest request not found.");
            return res.redirect("/requests");
        }

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

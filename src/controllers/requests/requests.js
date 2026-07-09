import {
    createQuestRequest,
    getRequestsByUserId
} from "../../models/reservations/reservations.js";

import {
    getJournalByRequestId
} from "../../models/journals/journals.js";

const requestQuest = async (req, res) => {
    try {
        if (!req.session.user) {
            req.flash("error", "Please log in to request a quest.");
            return res.redirect("/login");
        }

        await createQuestRequest(
            req.session.user.id,
            req.params.id
        );

        req.flash("success", "Quest request submitted!");
        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);

        req.flash("error", "Unable to request quest.");
        res.redirect("/quests");
    }
};

const myQuestRequestsPage = async (req, res) => {
    try {
        const requests = await getRequestsByUserId(
            req.session.user.id
        );

        const requestsWithJournals = await Promise.all(
            requests.map(async (request) => {
                const journal = await getJournalByRequestId(request.id);

                return {
                    ...request,
                    journal
                };
            })
        );

        res.render("requests/my-quests", {
            title: "My Quest Requests",
            requests: requestsWithJournals
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to load quest requests.");
    }
};

export {
    requestQuest,
    myQuestRequestsPage
};
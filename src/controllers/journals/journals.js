import { validationResult } from "express-validator";

import {
    getJournalByRequestId,
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry
} from "../../models/journals/journals.js";

import {
    getCompletedRequestForUser
} from "../../models/reservations/reservations.js";

const showCreateJournalForm = async (req, res) => {
    try {
        const completedRequest = await getCompletedRequestForUser(
            req.params.requestId,
            req.session.user.id
        );

        if (!completedRequest) {
            req.flash("error", "Completed quest request not found");
            return res.redirect("/my-quests");
        }

        const existingJournal = await getJournalByRequestId(req.params.requestId);

        if (existingJournal) {
            req.flash("warning", "You already wrote a journal entry for this quest");
            return res.redirect("/my-quests");
        }

        res.render("journals/create", {
            title: "Write Quest Journal",
            requestId: req.params.requestId
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to load journal form");
    }
};

const processCreateJournal = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash("error", error.msg);
        });

        return res.redirect(`/journals/request/${req.params.requestId}/new`);
    }

    try {
        const completedRequest = await getCompletedRequestForUser(
            req.params.requestId,
            req.session.user.id
        );

        if (!completedRequest) {
            req.flash("error", "Completed quest request not found");
            return res.redirect("/my-quests");
        }

        await createJournalEntry({
            user_id: req.session.user.id,
            quest_request_id: req.params.requestId,
            rating: req.body.rating,
            entry: req.body.entry
        });

        req.flash("success", "Quest journal entry saved");
        res.redirect("/my-quests");
    } catch (error) {
        console.error(error);

        req.flash("error", "Unable to save quest journal");
        res.redirect("/my-quests");
    }
};

const showEditJournalForm = async (req, res) => {
    try {
        const journal = await getJournalByRequestId(req.params.requestId);

        if (!journal || journal.user_id !== req.session.user.id) {
            req.flash("error", "Journal entry not found");
            return res.redirect("/my-quests");
        }

        res.render("journals/edit", {
            title: "Edit Quest Journal",
            journal,
            requestId: req.params.requestId
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to load journal edit form");
    }
};

const processEditJournal = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash("error", error.msg);
        });

        return res.redirect("/my-quests");
    }

    try {
        const updatedJournal = await updateJournalEntry(
            req.params.journalId,
            req.session.user.id,
            {
                rating: req.body.rating,
                entry: req.body.entry
            }
        );

        if (!updatedJournal) {
            req.flash("error", "Journal entry not found");
            return res.redirect("/my-quests");
        }

        req.flash("success", "Quest journal updated");
        res.redirect("/my-quests");
    } catch (error) {
        console.error(error);

        req.flash("error", "Unable to update quest journal");
        res.redirect("/my-quests");
    }
};

const processDeleteJournal = async (req, res) => {
    try {
        const deletedJournal = await deleteJournalEntry(
            req.params.journalId,
            req.session.user.id
        );

        if (!deletedJournal) {
            req.flash("error", "Journal entry not found");
            return res.redirect("/my-quests");
        }

        req.flash("success", "Quest journal deleted");
        res.redirect("/my-quests");
    } catch (error) {
        console.error(error);

        req.flash("error", "Unable to delete quest journal");
        res.redirect("/my-quests");
    }
};

export {
    showCreateJournalForm,
    processCreateJournal,
    showEditJournalForm,
    processEditJournal,
    processDeleteJournal
};

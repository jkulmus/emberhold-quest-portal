import {
    getJournalByRequestId,
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry
} from "../../models/journals/journals.js";

const showCreateJournalForm = async (req, res) => {
    try {
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
    try {
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
            res.redirect("/my-quests");
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
    try {
        await updateJournalEntry(
            req.params.journalId,
            req.session.user.id,
            {
                rating: req.body.rating,
                entry: req.body.entry
            }
        );

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
        await deleteJournalEntry(
            req.params.journalId,
            req.session.user.id
        );

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
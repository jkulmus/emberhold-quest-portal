import {
    getAllActiveJournals,
    adminDeleteJournalEntry
} from "../../models/journals/journals.js";

const manageJournalsPage = async (req, res) => {
    try {
        const journals = await getAllActiveJournals();

        res.render("admin/journals", {
            title: "Quest Journal Moderation",
            journals
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to load quest journals");
    }
};

const deleteJournal = async (req, res) => {
    try {
        await adminDeleteJournalEntry(req.params.id);

        req.flash("success", "Quest journal removed");
        res.redirect("/admin/journals");
    } catch (error) {
        console.error(error);

        req.flash("error", "Unable to remove quest journal");
        res.redirect("/admin/journals");
    }
};

export {
    manageJournalsPage,
    deleteJournal
};
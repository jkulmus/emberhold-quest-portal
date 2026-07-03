import { 
    getAllQuests,
    getQuestById,
    createQuest,
    updateQuest,
    deleteQuest
} from "../../models/quests/quests.js";

const questListPage = async (req, res) => {
    try {
        const quests = await getAllQuests();

        res.render("quests/list", {
            title: "Quest Board",
            quests
        });
    } catch (error) {
        console.error("Error loading quests:", error);
        res.status(500).send("Unable to load quests.");
    }
};

const questDetailPage = async (req, res) => {
    try {
        const quest = await getQuestById(req.params.id);

        if (!quest) {
            return res.status(404).send("Quest not found");
        }

        res.render("quests/detail", {
            title: quest.title,
            quest
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to load quest.");
    }
};

const showCreateQuestForm = (req, res) => {
    res.render("quests/create", {
        title: "Post a New Quest"
    });
};

const processCreateQuest = async (req, res) => {
    try {
        await createQuest(req.body);

        req.flash("success", "New quest posted to the guild board!");
        res.redirect("/quests");
    } catch (error) {
        console.error("Error creating quest:", error);

        req.flash("error", "Unable to post quest.");
        res.redirect("/quests/new");
    }
};

const showEditQuestForm = async (req, res) => {
    try {
        const quest = await getQuestById(req.params.id);

        if (!quest) {
            req.flash("error", "Quest not found.");
            return res.redirect("/quests");
        }

        res.render("quests/edit", {
            title: `Edit ${quest.title}`,
            quest
        });
    } catch (error) {
        console.error("Error loading edit quest form:", error);

        req.flash("error", "Unable to load quest for editing.");
        res.redirect("/quests");
    }
};

const processEditQuest = async (req, res) => {
    try {
        const updatedQuest = await updateQuest(req.params.id, req.body);

        if (!updatedQuest) {
            req.flash("error", "Quest not found.");
            return res.redirect("/quests");
        }

        req.flash("success", "Quest updated successfully.");
        res.redirect(`/quests/${req.params.id}`);
    } catch (error) {
        console.error("Error updating quest:", error);

        req.flash("error", "Unable to update quest.");
        res.redirect(`/quests/${req.params.id}/edit`);
    }
};

const processDeleteQuest = async (req, res) => {
    try {
        const deletedQuest = await deleteQuest(req.params.id);

        if (!deletedQuest) {
            req.flash("error", "Quest not found");
            return res.redirect("/quests");
        }

        req.flash("success", "Quest removed from the guild board");
        res.redirect("/quests");
    } catch (error) {
        console.error("Error deleting quest:", error);

        req.flash("error", "Unable to delete quest");
        res.redirect(`/quests/${req.params.id}`);
    }
};

export { 
    questListPage,
    questDetailPage,
    showCreateQuestForm,
    processCreateQuest,
    showEditQuestForm,
    processEditQuest,
    processDeleteQuest
};

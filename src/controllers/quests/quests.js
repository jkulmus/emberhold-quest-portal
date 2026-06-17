import { 
    getAllQuests,
    getQuestById,
    createQuest
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

export { 
    questListPage,
    questDetailPage,
    showCreateQuestForm,
    processCreateQuest
};
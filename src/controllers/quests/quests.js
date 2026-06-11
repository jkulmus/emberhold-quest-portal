import { 
    getAllQuests,
    getQuestById
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
        res.status(500).send("Unable to load quest");
    }
};

export { 
    questListPage,
    questDetailPage
};
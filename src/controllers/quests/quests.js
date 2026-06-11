import { getAllQuests } from "../../models/quests/quests.js";

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

export { questListPage };
import db from "../db.js";

const getAllQuests = async () => {
    const sql = `
        SELECT *
        FROM quests
        WHERE is_active = TRUE
        ORDER BY id;
    `;

    const result = await db.query(sql);
    return result.rows;
};

const getQuestById = async (id) => {
    const sql = `
        SELECT *
        FROM quests
        WHERE id = $1
            AND is_active = TRUE
    `;

    const result = await db.query(sql, [id]);

    return result.rows[0] || null;
}

export {
    getAllQuests,
    getQuestById
};
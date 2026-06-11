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

export {
    getAllQuests
};
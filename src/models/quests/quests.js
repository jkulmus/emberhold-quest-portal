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

const createQuest = async ({
    title,
    description,
    difficulty,
    reward,
    duration_minutes,
    max_party_size
}) => {
    const sql = `
        INSERT INTO quests
        (title, description, difficulty, reward, duration_minutes, max_party_size)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    const result = await db.query(sql, [
        title,
        description,
        difficulty,
        reward,
        duration_minutes,
        max_party_size
    ]);

    return result.rows[0];
};

const updateQuest = async (id, {
    title,
    description,
    difficulty,
    reward,
    duration_minutes,
    max_party_size
}) => {
    const sql = `
        UPDATE quests
        SET
            title = $1,
            description = $2,
            difficulty = $3,
            reward = $4,
            duration_minutes = $5,
            max_party_size = $6,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING *;
    `;

    const result = await db.query(sql, [
        title,
        description,
        difficulty,
        reward,
        duration_minutes,
        max_party_size,
        id
    ]);

    return result.rows[0] || null;
};

export {
    getAllQuests,
    getQuestById,
    createQuest,
    updateQuest
};
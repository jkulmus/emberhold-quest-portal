import db from "../db.js";

const getJournalByRequestId = async (questRequestId) => {
    const sql = `
        SELECT *
        FROM quest_journals
        WHERE quest_request_id = $1
            AND is_active = TRUE
        LIMIT 1;
    `;

    const result = await db.query(sql, [questRequestId]);
    return result.rows[0] || null;
};

const createJournalEntry = async ({
    user_id,
    quest_request_id,
    rating,
    entry
}) => {
    const sql = `
        INSERT INTO quest_journals
        (user_id, quest_request_id, rating, entry)
        VALUES 
        ($1, $2, $3,$4)
        RETURNING *;
    `;

    const result = await db.query(sql, [
        user_id,
        quest_request_id,
        rating,
        entry
    ]);

    return result.rows[0];
};

const updateJournalEntry = async (getJournalByRequestId, userId, {
    rating,
    entry
}) => {
    const sql = `
        UPDATE quest_journals
        SET
            rating = $1,
            entry = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
            AND user_id = $4
            AND is_active = TRUE
        RETURNING *;
    `;

    const result = await db.query(sql, [
        rating,
        entry,
        journalId,
        userId
    ]);

    return result.rows[0] || null;
};

const deleteJournalEntry = async (journalId, userId) => {
    const sql = `
        UPDATE quest_journals
        SET
            is_active = FALSE,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
            AND user_id = $2
        RETURNING *;
    `;

    const result = await db.query(sql, [journalId, userId]);
    return result.rows[0] || null;
};

const adminDeleteJournalEntry = async (journalId) => {
    const sql = `
        UPDATE quest_journals
        SET
            is_active = FALSE,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *;
    `;

    const result = await db.query(sql, [journalId]);
    return result.rows[0] || null;
};

const getAllActiveJournals = async () => {
    const sql = `
        SELECT
            qj.id,
            qj.rating,
            qj.entry,
            qj.created_at,
            u.name AS user_name,
            q.title AS quest_title
        FROM quest_journals qj
        JOIN users u
            ON qj.user_id = u.id
        JOIN quest_request qr
            ON qj.quest_request_id = qr.id
        JOIN quests q
            ON qr.quest_id = q.id
        WHERE qj.is_active = TRUE
        ORDER BY qj.created_at DESC;
    `;

    const result = await db.query(sql);
    return result.rows;
};

export {
    getJournalByRequestId,
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    adminDeleteJournalEntry,
    getAllActiveJournals
};
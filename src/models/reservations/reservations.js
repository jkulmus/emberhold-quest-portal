import db from "../db.js";

const VALID_REQUEST_STATUSES = [
    "Requested",
    "Approved",
    "Completed",
    "Cancelled"
];

const createQuestRequest = async (userId, questId) => {
    const sql = `
        INSERT INTO quest_requests
        (user_id, quest_id, status)
        VALUES
        ($1, $2, 'Requested')
        RETURNING *;
    `;

    const result = await db.query(sql, [userId, questId]);
    return result.rows[0];
};

const getRequestsByUserId = async (userId) => {
    const sql = `
        SELECT
            qr.id,
            qr.status,
            qr.staff_notes,
            qr.completed_at,
            qr.created_at,
            q.title,
            q.difficulty,
            q.reward
        FROM quest_requests qr
        JOIN quests q
            ON qr.quest_id = q.id
        WHERE qr.user_id = $1
        ORDER BY qr.created_at DESC;
    `;

    const result = await db.query(sql, [userId]);
    return result.rows;
};

const getAllQuestRequests = async () => {
    const sql = `
        SELECT
            qr.id,
            qr.status,
            qr.staff_notes,
            qr.completed_at,
            qr.created_at,
            u.name AS user_name,
            u.email AS user_email,
            q.title AS quest_title,
            q.difficulty
        FROM quest_requests qr
        JOIN users u
            ON qr.user_id = u.id
        JOIN quests q
            ON qr.quest_id = q.id
        ORDER BY qr.created_at DESC;
    `;

    const result = await db.query(sql);
    return result.rows;
};

const updateQuestRequestStatus = async (requestId, status) => {
    const normalizedStatus = status?.trim();

    if (!VALID_REQUEST_STATUSES.includes(normalizedStatus)) {
        throw new Error("Invalid quest request status");
    }

    const sql = `
        UPDATE quest_requests
        SET
            status = $1::VARCHAR,
            completed_at = CASE
                WHEN $1::VARCHAR = 'Completed' THEN CURRENT_TIMESTAMP
                ELSE NULL
            END,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
    `;

    const result = await db.query(sql, [normalizedStatus, requestId]);
    return result.rows[0] || null;
};

export {
    createQuestRequest,
    getRequestsByUserId,
    getAllQuestRequests,
    updateQuestRequestStatus,
    VALID_REQUEST_STATUSES
};

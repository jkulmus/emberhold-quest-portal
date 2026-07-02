import db from "../db.js";

const getUserQuestStats = async (userId) => {
    const sql = `
        SELECT
            COUNT(*) AS total_requests,
            COUNT(*) FILTER (WHERE status = 'Requested') AS requested_count,
            COUNT(*) FILTER (WHERE status = 'Approved') AS approved_count,
            COUNT(*) FILTER (WHERE status = 'Completed') AS completed_count,
            COUNT(*) FILTER (WHERE status = 'Cancelled') AS cancelled_count
        FROM quest_requests
        WHERE user_id = $1;
    `;

    const result = await db.query(sql, [userId]);
    return result.rows[0];
};

const getRecentUserRequests = async (userId) => {
    const sql = `
        SELECT
            qr.id,
            qr.status,
            qr.created_at,
            q.title,
            q.difficulty
        FROM quest_requests qr
        JOIN quests q
            ON qr.quest_id = q.id
        WHERE qr.user_id = $1
        ORDER BY qr.created_at DESC
        LIMIT 5;
    `;

    const result = await db.query(sql, [userId]);
    return result.rows;
};

export {
    getUserQuestStats,
    getRecentUserRequests
};
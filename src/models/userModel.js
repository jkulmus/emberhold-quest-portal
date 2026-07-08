import db from "./db.js";

const createUser = async (name, email, hashedPassword) => {
    const sql = `
        INSERT INTO users
        (name, email, password, role_id)
        VALUES
        (
            $1,
            $2,
            $3,
            (SELECT id FROM roles WHERE role_name = 'user')
        )
        RETURNING *;
    `;

    const result = await db.query(sql, [
        name,
        email,
        hashedPassword
    ]);

    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const sql = `
        SELECT *
        FROM users
        WHERE email = $1;
    `;

    const result = await db.query(sql, [email]);

    return result.rows[0];
};

const getUserByEmailWithRole = async (email) => {
    const sql = `
        SELECT
            u.id,
            u.name,
            u.email,
            u.password,
            u.role_id,
            r.role_name
        FROM users u
        LEFT JOIN roles r
            ON u.role_id = r.id
        WHERE LOWER(u.email) = LOWER($1)
        LIMIT 1;
    `;

    const result = await db.query(sql, [email]);

    return result.rows[0] || null;
}

const getAllUsersWithRoles = async () => {
    const sql = `
        SELECT
            u.id,
            u.name,
            u.email,
            u.created_at,
            r.role_name
        FROM users u
        LEFT JOIN roles r
            ON u.role_id = r.id
        ORDER BY u.created_at DESC;
    `;

    const result = await db.query(sql);
    return result.rows;
};

const updateUserRole = async (userId, roleName) => {
    const sql = `
        UPDATE users
        SET
            role_id = (
                SELECT id
                FROM roles
                WHERE role_name = $1
            ),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
    `;

    const result = await db.query(sql, [roleName, userId]);
    return result.rows[0] || null;
};

export {
    createUser,
    getUserByEmail,
    getUserByEmailWithRole,
    getAllUsersWithRoles,
    updateUserRole
};
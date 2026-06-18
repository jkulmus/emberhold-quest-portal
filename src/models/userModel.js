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

export {
    createUser,
    getUserByEmail,
    getUserByEmailWithRole
};
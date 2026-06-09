import db from "./db.js";

const createUser = async (name, email, hashedPassword) => {
    const sql = `
        INSERT INTO users
        (name, email, password, role_id)
        VALUES
        ($1, $2, $3, 1)
        RETURNING *;
    `;

    const result = await db.query(sql, [
        name,
        email,
        hassedPassword
    ]);

    return result.row[0];
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

export {
    createUser,
    getUserByEmail
};
import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
export const getAllUsers = async () => {
    const [users] = await pool.query(
        "SELECT id, fullname, username, email, role, address, phone_number, age FROM users"
    )
    return users;
};

export const getUserById = async (id) => {
    const [user] = await pool.query(
        "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id = ?",
        [id]
    )

    if (user.length === 0) {
        throw new ResponseError(404, "User not found")
    }
    return user[0];
};

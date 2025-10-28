import { request } from "express";
import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import validate from "../validations/validate.js";
import { createUserSchema, updateUserSchema } from "../validations/userValidation.js";


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

export const addUsers = async (request) => {
    const validated = validate(createUserSchema, request);
    console.log(validated);

    const { fullname, username, email, password, role, address, phone_number, age } = validated;
    
    const [result] = await pool.query(
        "INSERT INTO users (fullname, username, email, password, role, address, phone_number, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [fullname, username, email, password, role, address, phone_number, age]
    );

    return getUserById(result.insertId);
};

export const updateUsers = async (id, request) => {
    const validated = validate(updateUserSchema, request);
    const allowed = [
        "fullname",
        "username",
        "email",
        "password",
        "role",
        "address",
        "phone_number",
        "age",
    ];
    const fields = [];
    const values = [];

    for (const key of allowed) {
        if (Object.prototype.hasOwnProperty.call(validated, key)) {
            fields.push(`${key} = ?`);
            values.push(validated[key]);
        }
    }

    if (fields.length === 0) {
        throw new ResponseError(400, "No valid fields to update");
    }

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    const [result] = await pool.query(sql, values);

    if (result.affectedRows === 0) {
        throw new ResponseError(404, "User not found");
    }

    return getUserById(id);
};

export const deleteUsers = async (id) => {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
        throw new ResponseError(404, "User not found");
    }

    return;
};

import { query } from "../db.js";

export const findAllUsers = () => {
    return query("SELECT * FROM users");
}

export const findUserById = (id) => {
    return query("SELECT * FROM users WHERE id = $1", [id]);
}

export const insertUser = (name, email) => {
    return query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email]);
}

export const updateUser = (id, name, email) => {
    return query("UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *", [name, email, id]);
}

export const deleteUser = (id) => {
    return query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
}
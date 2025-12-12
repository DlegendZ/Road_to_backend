import { query } from "../db.js";

export const getAllUsersModel = () => {
  return query("SELECT * FROM users"); 
}

export const getUserOnIdModel = (id) => {
  return query("SELECT * FROM users WHERE id = $1", [id]); 
}

export const createUserModel = (name, email) => {
  return query("INSERT INTO users(name, email) VALUES ($1, $2) RETURNING *", [name, email]);
}

export const updateUserModel = (id, name, email) => {
  return query("UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *", [name, email, id]);
}

export const deleteUserModel = (id) => {
  return query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
}
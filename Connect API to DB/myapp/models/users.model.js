// models/users.model.js
import { query } from "../db.js";

// get all users
export const getAllUsersModel = () => {
  return query("SELECT id, name, email FROM users");
};

// get one user by id
export const getUserByIdModel = (id) => {
  return query("SELECT id, name, email FROM users WHERE id = $1", [id]);
};

// create user
export const createUserModel = (name, email) => {
  return query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
};

// update user
export const updateUserModel = (id, name, email) => {
  return query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );
};

// delete user
export const deleteUserModel = (id) => {
  return query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
};

// controllers/users.controller.js
import {
  getAllUsersModel,
  getUserByIdModel,
  createUserModel,
  updateUserModel,
  deleteUserModel,
} from "../models/users.model.js";

// GET /users
export const getAllUsers = async (req, res) => {
  try {
    const result = await getAllUsersModel();
    res.json(result.rows);
  } catch (err) {
    console.error("Error getting users:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// GET /users/:id
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getUserByIdModel(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// POST /users
export const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  try {
    const result = await createUserModel(name, email);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// PUT /users/:id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  try {
    const result = await updateUserModel(id, name, email);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteUserModel(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted", user: result.rows[0] });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Database error" });
  }
};

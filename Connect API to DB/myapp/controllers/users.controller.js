import {
    getAllUsersModel,
    getUserOnIdModel,
    createUserModel,
    updateUserModel,
    deleteUserModel
} from "../models/users.model.js";

export const getAllUsersController = async(req, res) => {
    try {
        const result = await getAllUsersModel();
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.err("Error:", err);
        res.status(500).json({error: "Database Error"});
    }
} 

export const getUserOnIdController = async(req, res) => {
    try {
        const {id} = req.params;

        const result = await getUserOnIdModel(id);

        if (result.rows.length === 0) {
            res.status(404).json({error : "User not found"});
        }
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).json({error: "Database Error"});
    }
}

export const createUserController = async(req, res) => {
    try {
        const {name, email} = req.body;

        const result = await createUserModel(name, email);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).json({error: "Database Error"});
    }
}

export const updateUserController = async(req, res) => {
    try {
        const {id} = req.params;
        const {name, email} = req.body;

        const result = await updateUserModel(id, name, email);

        if (result.rows.length === 0) {
            res.status(404).json({error : "User not found"});
        }

        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).json({error: "Database Error"});
    }
}

export const deleteUserController = async(req, res) => {
    try {
        const {id} = req.params

        const result = await deleteUserModel(id);

        if (result.rows.length === 0) {
            res.status(404).json({error : "User not found"});
        }
        
        res.status(204).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).json({error: "Database Error"});
    }
}
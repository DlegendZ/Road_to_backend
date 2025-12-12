//to handle req and res
import {
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    createUserService,
    deleteUserService
} from "../services/users.service.js"

export const getAllUsersController = async(req, res) => {
    try {
        const users = await getAllUsersService();
        res.status(200).json(users);
    }
    catch (err) {
        console.error("Error: ", err);
        res.status(500).json({error: "Internal server error"});
    }
}

export const  getUserByIdController = async(req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserByIdService(id)

        if (!user) {
            return res.status(404).json({error : "User not found"});
        }

        res.status(200).json(user);
    }
    catch (err) {
        console.error("Error", err);
        res.status(500).json("Internal server error");
    }
}

export const createUserController = async(req, res) => {
    const { name, email } = req.body;

    try {
        const user = await createUserService(name, email);
        res.status(201).json(user);
    }
    catch (err) {
        if (err.message === "Name is required" ||
            err.message === "Email is required"
        ) {
            return res.status(400).json({error : err.message});
        }
        console.error("Error", err);
        res.status(500).json("Internal server error");
    }
}

export const updateUserController = async(req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const user = await updateUserService(id, name, email);
        if (!user) {
            return res.status(404).json({error : "User not found"});;
        }
        res.status(200).json(user);
    }
    catch (err) {
        if (err.message === "Name is required" ||
            err.message === "Email is required"
        ) {
            return res.status(400).json({error : err.message});
        }
        console.error("Error", err);
        res.status(500).json("Internal server error");
    }
}   

export const deleteUserController = async(req, res) => {
    const { id } = req.params;

    try {
        const user = await deleteUserService(id);
        if (!user) {
            return res.status(400).json({error : "User not found"});
        }
        res.status(204).send();
    }
    catch (err) {
        console.error("Error: ", err);
        res.status(500).json({error : "Internal server error"});
    }
}

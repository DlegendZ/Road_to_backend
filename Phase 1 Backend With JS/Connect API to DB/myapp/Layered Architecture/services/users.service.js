import {
    findAllUsers,
    findUserById,
    updateUser,
    insertUser,
    deleteUser
} from "../repositories/users.repository.js";

export const getAllUsersService = async() => {
    const result = await findAllUsers();
    return result.rows;
}

export const getUserByIdService = async(id) => {
    const result = await findUserById(id);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
}

export const createUserService = async(name, email) => {
    if (!name || name.trim() === "") {
        throw new Error("Name is required");   
    }

    if (!email || email.trim() === "") {
        throw new Error("Email is required")
    }

    const result = await insertUser(name, email);
    return result.rows[0];
}

export const updateUserService = async(id, name, email) => {
    if (!name || name.trim() === "") {
        throw new Error("Name is required");
    }

    if (!email || email.trim() === "") {
        throw new Error("Email is required");
    }

    const result = await updateUser(id, name, email);
    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

export const deleteUserService = async(id) => {
    const result = await deleteUser(id);
    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

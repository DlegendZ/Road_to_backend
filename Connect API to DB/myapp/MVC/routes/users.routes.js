import { Router } from "express";
import {
    getAllUsersController,
    getUserOnIdController,
    createUserController,
    updateUserController,
    deleteUserController
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getAllUsersController);
router.get("/:id", getUserOnIdController);
router.post("/", createUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
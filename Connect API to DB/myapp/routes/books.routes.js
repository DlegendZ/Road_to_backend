import { Router } from "express";
import {
    getAllBooksController,
    createBookController
} from "../controllers/books.controller.js";

const router = Router();

router.get("/", getAllBooksController);
router.post("/", createBookController);

export default router;
import {
    getAllBooksModel,
    createBookModel
} from "../models/books.model.js"

export const getAllBooksController = async(req, res) => {
    try {
        const result = await getAllBooksModel();
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).json({error: "Database error"});
    }
}

export const createBookController= async(req, res) => {
    const { title, author } = req.body;

    if (!title || title.trim() === "") {
        res.status(400).json({error: "Title is required"});
    }

    if (!author || author.trim() === "") {
        res.status(400).json({error: "Author is required"});
    }

    try {
        const result = await createBookModel(title, author);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).json({error: "Database error"});
    }
}
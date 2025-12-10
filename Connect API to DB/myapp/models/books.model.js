import { query } from "../db.js";

export const getAllBooksModel = () => {
    return query("SELECT * FROM books");
}

export const createBookModel = (title, author) => {
    return query("INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *", [title, author]);
}
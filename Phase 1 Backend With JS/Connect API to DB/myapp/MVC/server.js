import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users.routes.js";
import bookRouter from "./routes/books.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRouter);
app.use("/books", bookRouter);

app.get("/", async(req, res) => {
    res.send("API is running");
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})


// server.js
import express from "express";
import dotenv from "dotenv";

dotenv.config(); // <-- loads .env

const app = express();
const port = process.env.PORT || 3000; // <-- read from .env

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

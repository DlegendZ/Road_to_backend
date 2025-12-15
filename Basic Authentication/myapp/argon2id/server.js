import express from "express";
import dotenv from "dotenv";
import authRouter from "./auth.routes.js"

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT http://localhost:${PORT}`);
});
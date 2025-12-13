import express from "express";
import authRoutes from "./auth.routes.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();

app.use("/auth", authRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

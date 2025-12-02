// db.js
import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // <-- loads .env

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // <-- read from .env
});

export const query = (text, params) => pool.query(text, params);

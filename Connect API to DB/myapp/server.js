// server.js
import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("API is running");
});

// mount users routes at /users
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// // server.js
// import express from "express";
// import dotenv from "dotenv";
// import { query } from "./db.js"

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000; 

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is running");
// });

// app.post("/users", async (req, res) => {
//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({error : "name and email are required"});
//   }

//   try {
//     const result = await query (
//       "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email]
//     );

//     res.status(201).json(result.rows[0]);
//   }
//   catch (err) {
//     console.error("Error creating user:", err);
//     res.status(500).json({error : "Database error"});
//   }
// });

// app.get("/users", async (req, res) => {
//   try {
//     const result = await query (
//       "SELECT * FROM users"
//     ); 

//     res.status(200).json(result.rows);
//   }
//   catch (err) {
//     console.error("Error getting users:", err);
//     res.status(500).json({error : "Database error"});
//   }
// });

// app.get("/users/:id", async (req, res) => {
//   const { id } = req.params;
  
//   try {
//     const result = await query (
//       "SELECT * FROM users WHERE id = $1", [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({error : "User not found"});
//     }

//     res.status(200).json(result.rows[0]);
//   }
//   catch (err) {
//     console.error("Error getting user", err);
//     res.status(500).json({error : "Database error"});
//   }
// });

// app.put("/users/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({error : "name and email are required"});
//   }

//   try {
//     const result = await query(
//       "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *", [name, email, id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({error : "User not found"});
//     }

//     res.status(200).json(result.rows[0]);
//   }
//   catch (err) {
//     console.error("Error updating user:", err);
//     res.status(500).json({error : "Database error"});
//   }
// });

// app.delete("/users/:id", async(req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await query(
//       "DELETE FROM users WHERE id = $1 RETURNING *", [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({error : "User not found"});
//     }

//     res.status(204).json({message : "User deleted", user : result.rows[0]});
//   }
//   catch (err) {
//     console.error("Error deleting user:", err);
//     res.status(500).json({error : "Database error"});
//   }
// })

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });



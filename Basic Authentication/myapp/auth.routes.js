// this is argon2
import { Router } from "express";
import argon2 from "argon2";
import { pool } from "./db.js";

const router = Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });
    if (password.length < 8) return res.status(400).json({ message: "Password must be >= 8 chars" });

    // hash (argon2id recommended)
    const password_hash = await argon2.hash(password, {
      type: argon2.argon2id,
      timeCost: 2,
      memoryCost: 19456, // ~19MB
      parallelism: 1,
    });

    const q = `INSERT INTO users(email, password_hash) VALUES($1,$2) RETURNING id,email,created_at`;
    const result = await pool.query(q, [email.toLowerCase(), password_hash]);

    return res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    if (err.code === "23505") return res.status(409).json({ message: "Email already used" });
    console.error("Error: ", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const userRes = await pool.query(
      "SELECT id,email,password_hash FROM users WHERE email=$1",
      [email.toLowerCase()]
    );
    const user = userRes.rows[0];
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await argon2.verify(user.password_hash, password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    return res.json({ message: "Login success", user: { id: user.id, email: user.email } });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;


//this is bcrypt
// import { Router } from "express";
// import bcrypt from "bcrypt";
// import { pool } from "./db.js";

// const router = Router();
// const BCRYPT_COST = 12;

// // REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) return res.status(400).json({ message: "Missing fields" });
//     if (password.length < 8) return res.status(400).json({ message: "Password must be >= 8 chars" });

//     const password_hash = await bcrypt.hash(password, BCRYPT_COST);

//     const q = `INSERT INTO users(email, password_hash) VALUES($1,$2) RETURNING id,email,created_at`;
//     const result = await pool.query(q, [email.toLowerCase(), password_hash]);

//     return res.status(201).json({ user: result.rows[0] });
//   } catch (err) {
//     if (err.code === "23505") return res.status(409).json({ message: "Email already used" });
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: "Missing fields" });

//     const userRes = await pool.query(
//       "SELECT id,email,password_hash FROM users WHERE email=$1",
//       [email.toLowerCase()]
//     );
//     const user = userRes.rows[0];
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const ok = await bcrypt.compare(password, user.password_hash);
//     if (!ok) return res.status(401).json({ message: "Invalid credentials" });

//     return res.json({ message: "Login success", user: { id: user.id, email: user.email } });
//   } catch {
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;

import { Router } from "express";
import argon2 from "argon2";
import { query } from "./db.js";

const router = Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({error : "Missing fields"});
    }

    if (password.length < 8) {
      return res.status(400).json({error : "Password must be >= 8 characters"});
    }

    const password_hash = await argon2.hash(password, {
      type : argon2.argon2id,
      memoryCost : 9765,
      timeCost : 2,
      parallelism : 1
    });

    try {
      const result = await query(
        "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *", [email.toLowerCase(), password_hash]
      )

      res.status(201).json({message : "Register success", user : result.rows[0]});
    }
    catch (err) {
      if (err.code === "23505") return res.status(409).json({error : "Email already used"});
      res.status(500).json({error : "Server error"});
    }
})

router.post("/login", async(req, res) => {
  const {email, password} = req.body;

  if (!email || !password) return res.status(400).json({error : "Missing fields"});

  try {
    const userRes = await query(
      "SELECT * FROM users WHERE email = $1", [email.toLowerCase()]
    );

    const user = userRes.rows[0]

    if (!user) return res.status(401).json({error : "Invalid credentials"});

    const password_verified = await argon2.verify(user.password_hash, password);

    if (!password_verified) return res.status(401).json({error : "Invalid credentials"}); 

    res.json({message : "Login Success", email : user.email, id : user.id});
  }
  catch (err) {
    return res.status(500).json({error : "Server error"});
  }
});

export default router;
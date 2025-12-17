import { Router } from "express";
import { query } from "./db.js";
import argon2 from "argon2";
import {
  createSession,
  requireSession,
  destroySession
} from "./session.middleware.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });
  if (password.length < 8)
    return res.status(400).json({ error: "Password must be 8 characters or more" });

  const password_hash = await argon2.hash(password, {
    timeCost: 2,
    memoryCost: 18554.7,
    parallelism: 1,
    type: argon2.argon2id,
  });

  try {
    const result = await query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
      [email.toLowerCase(), password_hash]
    );

    return res.status(200).json({ message: "User has been registered" });
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "Email already used" });
    console.error("Error: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const user = await query("SELECT * FROM users WHERE email = $1", [
      email.toLowerCase(),
    ]);

    const userRes = user.rows[0];
    if (!userRes) return res.status(401).json({ error: "Invalid credentials" });

    const pass_verified = await argon2.verify(userRes.password_hash, password);
    if (!pass_verified)
      return res.status(401).json({ error: "Invalid Credentials" });

    await createSession({userId : userRes.id, req, res});
    return res.status(200).json({message : "Login Success"});
  }
  catch (err) {
    console.error("Error: ", err);
    return res.status(500).json({error : "Internal server error"});
  }

});

router.get("/me", requireSession, async (req, res) => {
  return res.status(200).json({user : req.user});
})

router.post("/logout", async (req, res) => {
  await destroySession(req, res);
  return res.status(200).json({message : "Logout Success"});
});

export default router;

import { Router } from "express";
import { query } from "./db.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  generateRefreshToken,
  findValidRefreshToken,
  revokeRefreshTokenById,
  saveRefreshToken,
} from "./token.store.js";

const router = Router();

function signAccessToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
}

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });
  if (password.length < 8)
    return res
      .status(400)
      .json({ error: "password must be 8 characters or more" });

  const password_hash = await argon2.hash(password, {
    timeCost: 2,
    memoryCost: 18554,
    type: argon2.argon2id,
    parallelism: 1,
  });

  try {
    const result = await query(
      `INSERT INTO users(email, password_hash) VALUES ($1, $2) RETURNING *`,
      [email.toLowerCase(), password_hash]
    );

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "Email already registered" });
    console.error("error : ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const userRes = await query(`SELECT * FROM users WHERE email = $1`, [
      email.toLowerCase(),
    ]);

    const user = userRes.rows[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const pass_verified = await argon2.verify(user.password_hash, password);
    if (!pass_verified)
      return res.status(401).json({ error: "Invalid credentials" });

    const accessToken = signAccessToken(user);
    const refreshToken = generateRefreshToken();

    const { id: refreshId, expiresAt } = await saveRefreshToken({
      userId: user.id,
      refreshToken,
      req,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: expiresAt,
    });

    return res.status(200).json({ accessToken, refreshId });
  } catch (err) {
    console.error("error: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken)
    return res.status(401).json({ error: "Refresh token not found" });

  const row = await findValidRefreshToken(refreshToken);
  if (!row) return res.status(401).json({ error: "Invalid refresh token" });

  try {
    const userRes = await query(`SELECT * FROM users WHERE id = $1`, [
      row.user_id,
    ]);

    const user = userRes.rows[0];

    const accessToken = signAccessToken(user);

    return res.status(200).json({ accessToken });
  } catch (err) {
    console.error("error: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", async (req, res) => {
  const refreshToken = req.cookies?.refresh_token;
  if (refreshToken) {
    const row = await findValidRefreshToken(refreshToken);
    if (row) await revokeRefreshTokenById(row.id);
  }

  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.json({ message: "Logged out" });
});

export default router;

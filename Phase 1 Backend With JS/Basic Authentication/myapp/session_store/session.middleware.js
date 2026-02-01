import crypto from "crypto";
import { query } from "./db.js";

const SESSION_DAYS = 7;

export async function createSession({userId, req, res}) {
  const sid = crypto.randomUUID(); //session id
  const expires_at = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await query(
    "INSERT INTO sessions (id, user_id, expires_at, ip, user_agent) VALUES ($1, $2, $3, $4, $5)", 
    [sid, userId, expires_at, req.ip, req.headers["user-agent"] || null]
  );

  res.cookie("session_id", sid, {
    httpOnly : true,
    secure : false,
    sameSite : "lax",
    expires : expires_at
  });

  return sid;
};

export async function requireSession(req, res, next) {
  const sid = req.cookies?.session_id;
  if (!sid) return res.status(401).json({message : "Unauthorized"});

  const result = await query(
    `SELECT u.id, u.email 
    FROM sessions s JOIN users u  
    ON u.id = s.user_id
    WHERE s.expires_at > NOW() AND s.id = $1`, 
    [sid]
  );

  if (result.rowCount === 0) return res.status(401).json({message : "Unauthorized"});

  req.user = result.rows[0];
  next();
};

export async function destroySession(req, res) {
  const sid = req.cookies?.session_id;
  if (sid) await query(
    `DELETE FROM sessions WHERE id = $1`,
    [sid]
  );

  res.clearCookie("session_id", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });
};
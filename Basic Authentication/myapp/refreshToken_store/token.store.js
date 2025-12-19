import crypto from "crypto";
import { query } from "./db.js";

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

function sha256(refreshToken) {
  return crypto.createHash("sha256").update(refreshToken).digest("hex");
}

export async function saveRefreshToken({ userId, refreshToken, req }) {
  const id = crypto.randomUUID();
  const token_hash = sha256(refreshToken);

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await query(
    `INSERT INTO refresh_tokens(id, user_id, token_hash, expires_at, ip, user_agent)
        VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      id,
      userId,
      token_hash,
      expiresAt,
      req.ip,
      req.headers["user-agent"] || null,
    ]
  );

  return { id, expiresAt };
}

export async function findValidRefreshToken(refreshToken) {
  const token_hash = sha256(refreshToken);

  const result = await query(
    `SELECT * FROM refresh_tokens 
        WHERE token_hash = $1 
        AND revoked_at IS NULL
        AND expires_at > NOW()`,
    [token_hash]
  );

  return result.rows[0] || null;
}

export async function revokeRefreshTokenById(id) {
  await query(
    `UPDATE refresh_tokens SET revoked_at = NOW() 
        WHERE id = $1`,
    [id]
  );
}

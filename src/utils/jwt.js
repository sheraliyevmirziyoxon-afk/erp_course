import { configDotenv } from "dotenv";
import JWT from "jsonwebtoken";
configDotenv();

export function generateAccessToken(payload) {
  console.log(payload);
  return JWT.sign(payload, process.env.SECRET_KEY, { expiresIn: "30m" });
}

export function generateRefreshToken(payload) {
  return JWT.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
}

export function verifyToken(token) {
  console.log(JWT.verify(token, process.env.SECRET_KEY), "2332");
  return JWT.verify(token, process.env.SECRET_KEY);
}

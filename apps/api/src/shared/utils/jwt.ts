import jwt from "jsonwebtoken";
import type { Secret, SignOptions } from "jsonwebtoken";

const accessSecret: Secret = process.env.JWT_ACCESS_SECRET!;
const refreshSecret: Secret = process.env.JWT_REFRESH_SECRET!;

export function generateAccessToken(payload: object) {
  const options: SignOptions = {
    expiresIn: "15m",
  };

  return jwt.sign(payload, accessSecret, options);
}

export function generateRefreshToken(payload: object) {
  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, refreshSecret, options);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, accessSecret);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, refreshSecret);
}
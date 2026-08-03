
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const accessSecret = process.env.JWT_ACCESS_SECRET;

  if (!accessSecret) {
    return res.status(500).json({ message: "Server auth config missing" });
  }

  try {
    const payload = jwt.verify(token, accessSecret);

    (req as any).user = payload;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
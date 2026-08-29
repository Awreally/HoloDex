import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return next(new AppError(401, "Authentication required", "AUTHENTICATION_REQUIRED"));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string; role: string };
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    if (!(err instanceof jwt.TokenExpiredError)) {
      console.error(err);
    }
    return next(new AppError(401, "Invalid token", "INVALID_TOKEN"));
  }
}

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
      role: string;
    };
    req.user = { userId: decoded.userId, role: decoded.role };
  } catch (err) {
    if (!(err instanceof jwt.TokenExpiredError)) {
      console.error(err);
    }
  }

  next();
}

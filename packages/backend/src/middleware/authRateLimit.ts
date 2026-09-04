import rateLimit from "express-rate-limit";
import { env } from "../config/env";
import { AppError } from "../errors/AppError";

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => env.NODE_ENV === "test",
  handler: (_req, _res, next) => {
    next(new AppError(429, "Too many attempts, please try again later", "TOO_MANY_REQUESTS"));
  },
});

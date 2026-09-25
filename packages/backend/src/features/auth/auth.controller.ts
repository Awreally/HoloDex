import { Request, Response, NextFunction, CookieOptions } from "express";
import { registerUser, loginUser, getUserById } from "./auth.service";
import { env } from "../../config/env";
import { AppError } from "../../errors/AppError";
import type { RegisterInput, LoginInput } from "./auth.validation";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
};

export async function registerUserHandler(
  req: Request<unknown, unknown, RegisterInput>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { token, user } = await registerUser(req.body);
    const { passwordHash, ...safeUser } = user;

    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      data: safeUser,
    });
  } catch (err) {
    next(err);
  }
}

export async function loginUserHandler(
  req: Request<unknown, unknown, LoginInput>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { token, user } = await loginUser(req.body);
    const { passwordHash, ...safeUser } = user;

    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      data: safeUser,
    });
  } catch (err) {
    next(err);
  }
}

export async function getMeHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.user) {
      return next(
        new AppError(401, "Authentication required", "AUTHENTICATION_REQUIRED"),
      );
    }
    const user = await getUserById(req.user.userId);

    if (!user) {
      return next(new AppError(404, "User not found", "USER_NOT_FOUND"));
    }
    const { passwordHash, ...safeUser } = user;
    res.status(200).json({ success: true, data: safeUser });
  } catch (err) {
    next(err);
  }
}

export async function logoutHandler(
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  // Must match the options used when setting the cookie, or the browser ignores the clear
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ success: true });
}

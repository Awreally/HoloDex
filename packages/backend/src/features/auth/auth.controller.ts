import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser, getUserById } from "./auth.service";
import { env } from "../../config/env";
import { AppError } from "../../errors/AppError";

export async function registerUserHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { token, user } = await registerUser(req.body);
    const { passwordHash, ...safeUser } = user;

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
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
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { token, user } = await loginUser(req.body);
    const { passwordHash, ...safeUser } = user;

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
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
  next: NextFunction,
): Promise<void> {
 res.clearCookie("token", {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax",
 });
 res.status(200).json({ success: true});
}

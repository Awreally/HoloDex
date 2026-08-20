import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "./auth.service";

export async function registerUserHandler(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const AuthResponse = await registerUser(req.body);
        const { passwordHash, ...safeUser } = AuthResponse.user;
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
):Promise<void> {
    try {
        const AuthResponse = await loginUser(req.body)
        res.status(201).json({
            success: true,
            data: AuthResponse
        });
    } catch (err) {
        next(err);
    };
}
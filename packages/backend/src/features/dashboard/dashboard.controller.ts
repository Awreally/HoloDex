import { Request, Response, NextFunction } from "express";
import { getDashboardForUser } from "./dashboard.service";
import { AppError } from "../../errors/AppError";

export async function getDashboard(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const userId = req.user?.userId;

        if (typeof userId !== "string") {
              return next(
                new AppError(401, "Authentication required", "AUTHENTICATION_REQUIRED"),
              );
            }

        const dashboard = await getDashboardForUser(userId);
        res.status(200).json({
            success:true,
            data: dashboard,
        });
    } catch (err) {
        next(err);
    }
}
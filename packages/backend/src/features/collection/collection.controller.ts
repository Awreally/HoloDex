import { Request, Response, NextFunction } from "express";
import { getCollectionForUser } from "./collection.service";
import { AppError } from "../../errors/AppError";

export async function getCollection(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const userId = req.user?.userId;

        if (typeof userId !== "string") {
            return next(new AppError(401, "Authentication required", "AUTHENTICATION_REQUIRED"));
        }

    const collection = await getCollectionForUser(userId);
    res.status(200).json({
        succsess: true,
        data: collection,
    })
    } catch (err) {
        next(err);
    }
}
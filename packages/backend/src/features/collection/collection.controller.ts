import { Request, Response, NextFunction } from "express";
import { getCollectionForUser } from "./collection.service";
import { AppError } from "../../errors/AppError";
import type { CollectionQuery } from "./collection.validation";

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

    const query = req.query as unknown as CollectionQuery;
    const { entries, pagination } = await getCollectionForUser(userId, query);
    res.status(200).json({
        success: true,
        data: entries,
        pagination,
    })
    } catch (err) {
        next(err);
    }
}
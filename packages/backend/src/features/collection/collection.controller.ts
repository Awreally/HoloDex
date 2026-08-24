import { Request, Response, NextFunction } from "express";
import { getCollectionForUser } from "./collection.service";

export async function getCollection(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const userId = req.user?.userId;

         if (typeof userId !== "string") {
      res.status(401).json({ message: "Unauthorized" });
      return;
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
import { Request, Response, NextFunction } from "express";
import {
  getCollectionForUser,
  getCollectionSetsForUser,
} from "./collection.service";
import { AppError } from "../../errors/AppError";
import { CollectionQuery } from "./collection.validation";
export async function getCollection(
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

    const { setId } = req.params;
    if (typeof setId !== "string") {
      return next(new AppError(400, "Missing set id", "VALIDATION_ERROR"));
    }
    const query = req.query as unknown as CollectionQuery;

    const { entries, pagination } = await getCollectionForUser(
      userId,
      setId,
      query,
    );
    res.status(200).json({
      success: true,
      data: entries,
      pagination,
    });
  } catch (err) {
    next(err);
  }
}

export async function getCollectionSets(
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

    const setUser = await getCollectionSetsForUser(userId);
    res.status(200).json({
      success: true,
      data: setUser,
    });
  } catch (err) {
    next(err);
  }
}

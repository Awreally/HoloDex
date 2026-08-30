import { Request, Response, NextFunction } from "express";
import { openPackForSet } from "./packs.service";
import type { OpenPackParams } from "./packs.validation";
import { AppError } from "../../errors/AppError";

export async function openPack(
  req: Request<OpenPackParams>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { setId } = req.params;
    const userId = req.user?.userId;

    if (typeof userId !== "string") {
      return next(new AppError(401, "Authentication required", "AUTHENTICATION_REQUIRED"));
    }

    const pulledCards = await openPackForSet(setId, userId);

    if (pulledCards === null) {
      return next(new AppError(404, `No cards found for set '${setId}'`, "SET_NOT_FOUND"));
    }

    res.status(200).json({ success: true, data: pulledCards });
  } catch (err) {
    next(err);
  }
}
import { Request, Response, NextFunction } from "express";
import { openPackForSet } from "./packs.service";

export async function openPack(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { setId } = req.params;
    const userId = req.user?.userId;

    if (typeof userId !== "string") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (typeof setId !== "string") {
      res.status(400).json({ message: "Invalid setId" });
      return;
    }

    const pulledCards = await openPackForSet(setId, userId);

    if (pulledCards === null) {
      res.status(404).json({ message: `No cards found for set '${setId}'` });
      return;
    }

    res.status(200).json(pulledCards);
  } catch (err) {
    next(err);
  }
}
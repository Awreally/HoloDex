import { Request, Response, NextFunction } from "express";
import { openPackForSet } from "./packs.service";

export async function openPack(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { setId } = req.params;

    if (typeof setId !== "string") {
      res.status(400).json({ message: "Invalid setId" });
      return;
    }
    const pack = await openPackForSet(setId);

    if (pack === null) {
      res.status(404).json({ message: `No cards found for set '${setId}'` });
      return;
    }

    res.status(200).json(pack);
  } catch (err) {
    next(err);
  }
}

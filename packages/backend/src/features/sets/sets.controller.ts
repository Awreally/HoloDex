import { getAllSets } from "./sets.service";
import { Request, Response, NextFunction } from "express";

export async function getSets(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
    try {
        const sets = await getAllSets();
        res.status(200).json(sets);
    } catch (err) {
        next(err);
    }
}

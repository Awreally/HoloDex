import { Router } from "express";
import { openPack } from "./packs.controller";
import { requireAuth } from "../../middleware/requireAuth";

export const packsRouter = Router();

packsRouter.post("/sets/:setId/open", requireAuth, openPack);

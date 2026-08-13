import { Router } from "express";
import { openPack } from "./packs.controller";

export const packsRouter = Router();

packsRouter.post("/sets/:setId/open", openPack);
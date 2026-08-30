import { Router } from "express";
import { openPack } from "./packs.controller";
import { requireAuth } from "../../middleware/requireAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { OpenPackParamsSchema } from "./packs.validation";

export const packsRouter = Router();

packsRouter.post(
  "/sets/:setId/open",
  requireAuth,
  validateRequest({ params: OpenPackParamsSchema }),
  openPack,
);

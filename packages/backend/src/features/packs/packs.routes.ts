import { Router } from "express";
import { openPack } from "./packs.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { OpenPackParamsSchema } from "./packs.validation";
import { optionalAuth } from "../../middleware/optionalAuth";
export const packsRouter = Router();

packsRouter.post(
  "/sets/:setId/open",
  optionalAuth,
  validateRequest({ params: OpenPackParamsSchema }),
  openPack,
);

import { Router } from "express";
import { getDashboard } from "./dashboard.controller";
import { requireAuth } from "../../middleware/requireAuth";

export const dashboardRouter = Router();

dashboardRouter.get("/", requireAuth, getDashboard);

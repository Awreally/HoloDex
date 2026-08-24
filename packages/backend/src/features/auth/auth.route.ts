import { Router } from "express";
import { registerUserHandler, loginUserHandler, getMeHandler, logoutHandler } from "./auth.controller";
import { requireAuth } from "../../middleware/requireAuth";

export const authRouter = Router();

authRouter.get("/me", requireAuth, getMeHandler);
authRouter.post("/register", registerUserHandler);
authRouter.post("/login", loginUserHandler);
authRouter.post("/logout", logoutHandler);




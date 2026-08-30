import { Router } from "express";
import { registerUserHandler, loginUserHandler, getMeHandler, logoutHandler } from "./auth.controller";
import { requireAuth } from "../../middleware/requireAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { authRateLimit } from "../../middleware/authRateLimit";
import { RegisterSchema, LoginSchema } from "./auth.validation";

export const authRouter = Router();

authRouter.get("/me", requireAuth, getMeHandler);
authRouter.post("/register", authRateLimit, validateRequest({ body: RegisterSchema }), registerUserHandler);
authRouter.post("/login", authRateLimit, validateRequest({ body: LoginSchema }), loginUserHandler);
authRouter.post("/logout", logoutHandler);




import { Router } from "express";
import { forgotPassword, getUser, login, register, updateUser, verify } from "../controllers/user.controller";
import { exceptionEscalator } from "../utils/helpers/exception.helper";
import protect from "../middlewares/auth.middleware";

export const userRouter = Router();

userRouter.post("/register", exceptionEscalator(register));
userRouter.post("/login", exceptionEscalator(login))
userRouter.post("/verify", exceptionEscalator(verify))
userRouter.post("/forgot-password", exceptionEscalator(forgotPassword))

userRouter.use(protect)
userRouter.get("/me", exceptionEscalator(getUser))
userRouter.patch("/me", exceptionEscalator(updateUser))
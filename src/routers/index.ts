import { Router } from "express";
import { error404Handler, exceptionFilter } from "../utils/helpers/exception.helper";
import { userRouter } from "./user.route";




export const rootRouter = Router()

rootRouter.use("/auth",userRouter)

rootRouter.use(exceptionFilter)
rootRouter.get("*", error404Handler())
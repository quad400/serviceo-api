import { Router } from "express";
import { error404Handler, exceptionFilter } from "../utils/helpers/exception.helper";
import { userRouter } from "./user.route";
import { serviceRoutes } from "./service.route";
import { categoryRoutes } from "./category.route";




export const rootRouter = Router()

rootRouter.use("/auth",userRouter)
rootRouter.use("/service", serviceRoutes)
rootRouter.use("/category", categoryRoutes)


rootRouter.use(exceptionFilter)
rootRouter.get("*", error404Handler())
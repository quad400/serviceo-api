import { Router } from "express";
import { exceptionEscalator } from "../utils/helpers/exception.helper";
import { serviceCreate } from "../controllers/service.controller";
import protect from "../middlewares/auth.middleware";

export const serviceRoutes = Router();

serviceRoutes.post("", protect, exceptionEscalator(serviceCreate));

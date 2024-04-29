import { Router } from "express";
import protect from "../middlewares/auth.middleware";
import { exceptionEscalator } from "../utils/helpers/exception.helper";
import {
  createCategory,
  getAllCategory,
} from "../controllers/category.controller";

export const categoryRoutes = Router();

categoryRoutes.post("", protect, exceptionEscalator(createCategory));
categoryRoutes.get("", protect, exceptionEscalator(getAllCategory));

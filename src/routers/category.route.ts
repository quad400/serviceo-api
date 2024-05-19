import { Router } from "express";
import protect from "../middlewares/auth.middleware";
import { exceptionEscalator } from "../utils/helpers/exception.helper";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../controllers/category.controller";

export const categoryRoutes = Router();

categoryRoutes.get("/:id", exceptionEscalator(getCategory));
categoryRoutes.get("", exceptionEscalator(getAllCategory));
categoryRoutes.post("", protect, exceptionEscalator(createCategory));
categoryRoutes.patch("/:id", protect, exceptionEscalator(updateCategory));
categoryRoutes.delete("/:id", protect, exceptionEscalator(deleteCategory));

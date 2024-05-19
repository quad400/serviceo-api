import { Router } from "express";
import { exceptionEscalator } from "../utils/helpers/exception.helper";
import {
  addReview,
  getAllServiceReviews,
  serviceCreate,
  serviceGet,
  serviceGetAll,
  serviceUpdate,
} from "../controllers/service.controller";
import protect from "../middlewares/auth.middleware";

export const serviceRoutes = Router();

serviceRoutes.post("", protect, exceptionEscalator(serviceCreate));
serviceRoutes.get("", exceptionEscalator(serviceGetAll));
serviceRoutes.patch("/:id", protect, exceptionEscalator(serviceUpdate));
serviceRoutes.get("/:id", exceptionEscalator(serviceGet));
serviceRoutes.post("/:id/review", protect, exceptionEscalator(addReview));
serviceRoutes.get("/:id/review", exceptionEscalator(getAllServiceReviews));

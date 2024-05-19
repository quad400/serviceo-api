import { Router } from "express";
import protect from "../middlewares/auth.middleware";
import { exceptionEscalator } from "../utils/helpers/exception.helper";
import {
  createBooking,
  updateBooking,
  getAllBookings,
  getBooking,
} from "../controllers/booking.controller";

export const bookingRoutes = Router();

bookingRoutes.get("", protect, exceptionEscalator(getAllBookings));
bookingRoutes.post("", protect, exceptionEscalator(createBooking));
bookingRoutes.get("/:bookingId", protect, exceptionEscalator(getBooking));
bookingRoutes.patch("/:bookingId", protect, exceptionEscalator(updateBooking));

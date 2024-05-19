import { Request, Response } from "express";
import {
  createBookingDao,
  getAllBookingsDao,
  getBookingDao,
  updateBookingDao,
} from "../dao/booking.dao";
import { ResponseUtil } from "../utils/helpers/response.helper";

export const createBooking = async (req: Request, res: Response) => {
  const { _id: userId } = req.user;

  const body = req.body;
  const booking = await createBookingDao(userId, body);

  ResponseUtil.sendSuccess(res, booking);
};

export const updateBooking = async (req: Request, res: Response) => {
  const { _id: userId } = req.user;
  const { bookingId } = req.params;

  const body = req.body;

  const booking = await updateBookingDao(bookingId, userId, body);

  ResponseUtil.sendSuccess(res, booking);
};

export const getAllBookings = async (req: Request, res: Response) => {
  const { _id: userId } = req.user;

  const bookings = await getAllBookingsDao(userId);

  ResponseUtil.sendSuccess(res, bookings);
};

export const getBooking = async (req: Request, res: Response) => {
  const { _id: userId } = req.user;
  const { bookingId } = req.params;

  const booking = await getBookingDao(userId, bookingId);

  ResponseUtil.sendSuccess(res, booking);
};

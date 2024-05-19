import { Booking } from "../models/booking.model";
import { Service } from "../models/service.model";
import {
  findModel,
  findModelByData,
  findModelById,
  updateModel,
  userFindByIdDao,
} from "../utils/helpers/dao.helper";
import { isOwnerPermission } from "../utils/helpers/permission.helper";

export async function createBookingDao(
  userId: string,
  body: Record<string, any>
) {
  const user = await userFindByIdDao(userId);

  const {serviceId, ...data} = body
   
  const service = await findModelById(Service, serviceId);

  const booking = await Booking.create({
    createdBy: user?._id,
    service: service?._id,
    ...body,
  });

  return booking;
}

export async function updateBookingDao(
  bookingId: string,
  userId: string,
  body: Record<string, any>
) {
  await isOwnerPermission(Booking, bookingId, userId);
  await userFindByIdDao(userId);

  const booking = await updateModel(Booking, bookingId, body);

  return booking;
}

export async function getAllBookingsDao(userId: string) {
  const user = await userFindByIdDao(userId);
  const bookings = await findModel(Booking, { createdBy: user?._id });
  return bookings;
}

export async function getBookingDao(userId: string, bookingId: string) {
  const booking = await findModelByData(Booking, {
    createdBy: userId,
    _id: bookingId,
  });

  return booking;
}

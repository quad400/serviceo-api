import { Schema, model } from "mongoose";
import { IBooking } from "../interfaces/service.interface";
import { Types } from "mongoose";

const bookingSchema = new Schema<IBooking>(
  {
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: Types.ObjectId,
      ref: "Service",
      required: true,
    },
    datetime: {
      type: Date,
      default: null,
    },
    count: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["pending", "cancelled", "completed"],
      default: "pending",
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Booking = model("Booking", bookingSchema);

import mongoose, { Types } from "mongoose";

import { IUser, IAddress, IPaymentInfo, Role } from "../interfaces/user.interface";

const addressSchema = new mongoose.Schema<IAddress>({
  label: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
});

const paymentInfoSchema = new mongoose.Schema<IPaymentInfo>({
  cardNumber: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  cvc: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema<IUser>({
  fullName: {
   type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
   type: String,
   default: null
  },
  role: {
    type: String,
    enum: Role,
    default: Role.USER
  },
  password: {
    type: String,
    required: true,
  },
  verifiedUser: {
    type: Boolean,
    default: false
  },
  otpCode: {
    type: String,
  },
  otpCodeExpire: {
    type: Date,
  },
  services: {
    type: [Types.ObjectId],
    default: []
  },
  address: {
    type: [addressSchema],
    default: [],
  },
  paymentInfo: {
    type: [paymentInfoSchema],
    default: [],
  },
  bookings: {
    type: [Types.ObjectId],
    ref: "Booking",
    default: []
  }
}, {timestamps: true});


const User = mongoose.model<IUser>("User", userSchema)



export default User
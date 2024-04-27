import mongoose from "mongoose";

import { IUser, IAddress, IPaymentInfo } from "../interfaces/user.interface";

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
  fullName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: String,
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
  address: {
    type: [addressSchema],
    default: [],
  },
  paymentInfo: {
    type: [paymentInfoSchema],
    default: [],
  },
  // bookings: {
  //   type: []
  // }
});


const User = mongoose.model<IUser>("User", userSchema)



export default User
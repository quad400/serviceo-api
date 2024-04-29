import { IBooking, IService } from "./service.interface";

enum Role {
  USER = "user",
  PROVIDER = "provider",
}

export interface IUser {
  email: string;
  fullName?: string;
  password: string;
  avatar?: string;
  role?: Role;
  verifiedUser?: boolean;
  otpCode?: string;
  otpCodeExpire?: Date;
  address?: [IAddress];
  paymentInfo?: [IPaymentInfo];
  bookings?: [IBooking];
  comparePassword?: (enteredPassword: string) => Promise<boolean>;
}

export interface IAddress {
  label: string;
  detail: string;
}

export interface IPaymentInfo {
  cardNumber: number;
  expiryDate: string;
  cvc: number;
}

export type IResetPassword = {
  password: string;
  confirmPassword: string;
};

export interface IUserService extends IUser {
  services: [IService];
}

export type IRegister = Pick<IUser, "email" | "password" | "fullName">;

export type ILogin = Pick<IUser, "email" | "password">;

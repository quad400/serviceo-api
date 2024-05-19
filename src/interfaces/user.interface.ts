import { IBooking, IService } from "./service.interface";

export enum Role {
  USER = "user",
  PROVIDER = "provider",
  ADMIN = "admin",
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
  services?: [IService];
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

export type IReg = Pick<IUser, "email" | "password" | "fullName" | "role">;

export type IRegister = {
  user: IReg;
  isProvider: boolean;
};
export type ILogin = Pick<IUser, "email" | "password">;

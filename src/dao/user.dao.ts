import type { ILogin, IRegister, IUser } from "../interfaces/user.interface";
import User from "../models/user.model";
import {
  DatabaseException,
  ExceptionCodes,
} from "../utils/exceptions/database.exception";
import { HttpException } from "../utils/exceptions/http.exceptions";

export async function registerDao(dto: IRegister) {
  const userExist = await User.findOne({ email: dto?.email });

  if (userExist) {
    throw new DatabaseException(
      ExceptionCodes.DUPLICATE_ENTRY,
      "user already exists"
    );
  }

  return await User.create(dto);
}

export async function loginDao(dto: ILogin) {
  const userExist = await User.findOne({ email: dto?.email });

  if (!userExist) {
    throw new DatabaseException(
      ExceptionCodes.NOT_FOUND,
      "user does not exist"
    );
  }

  return userExist;
}

export async function verifiedDao(code: string) {
  const user = await User.findOne({
    otpCode: code,
    otpCodeExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new DatabaseException(ExceptionCodes.NOT_FOUND, "Invalid otp code");
  }

  return user;
}

export async function userDao(id: string) {
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new DatabaseException(ExceptionCodes.NOT_FOUND, "user not found");
  }

  return user;
}

export async function updateUserDao(id: string, body: IUser) {
  const user = await User.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  }).select("-password");

  if (!user) {
    throw new DatabaseException(ExceptionCodes.NOT_FOUND, "user not found");
  }
  
  return user;
}

export async function forgotPasswordDao(email: string) {
  const userExist = await User.findOne({ email: email });

  if (!userExist) {
    throw new DatabaseException(
      ExceptionCodes.NOT_FOUND,
      "user does not exist"
    );
  }

  return userExist;
}

export async function resetPasswordDao(id: string){

  const user = await User.findById(id)

  if(!user){
    throw new DatabaseException(ExceptionCodes.NOT_FOUND, "user not found");
  }
  return user
}
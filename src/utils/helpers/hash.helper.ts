import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { IUser } from "../../interfaces/user.interface";
import { Types } from "mongoose";

async function hash(text: string) {
  const genSalt = await bcrypt.genSalt(10);
  return await bcrypt.hash(text, genSalt);
}

async function compare(hash: string, text: string) {
  return await bcrypt.compare(text, hash);
}

async function generateOtp(user: IUser) {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  user.otpCode = code;

  let otpExpired = new Date();
  // @ts-expect-error
  user.otpCodeExpire = otpExpired.setMinutes(otpExpired.getMinutes() + 5);
  return code;
}

async function generateToken(_id: Types.ObjectId) {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET!, {
    expiresIn: "2 days",
  });
  return token;
}

export { compare, hash, generateOtp, generateToken };

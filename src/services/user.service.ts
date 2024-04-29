import bcrypt from "bcrypt";
import fs from "fs";

import {
  forgotPasswordDao,
  loginDao,
  registerDao,
  resetPasswordDao,
  verifiedDao,
} from "../dao/user.dao";
import {
  ILogin,
  IRegister,
  IResetPassword,
  IUser,
} from "../interfaces/user.interface";
import { generateOtp, generateToken, hash } from "../utils/helpers/hash.helper";
import { HttpException } from "../utils/exceptions/http.exceptions";
import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} from "../constants/status-codes.constant";
import { emailManager } from "../utils/helpers/email.helper";

export const registerService = async (dto: IRegister) => {
  dto.password = await hash(dto.password);

  try {
    const user = await registerDao(dto);

    generateOtp(user);

    await user.save();

    const emailTemplateSourceForgotPassword = fs.readFileSync(
      "./src/emails/forgotpassword.hbs",
      "utf8"
    );

    const templateData = {
      subject: "Welcome to serviceo. Please verify your email",
      registrationCode: user?.otpCode,
    };

    await emailManager({
      subject: "Welcome to lundenva. Please verify your email",
      emailSource: emailTemplateSourceForgotPassword,
      templateData,
      user,
    });

    return user;
  } catch (error: any) {
    throw new HttpException(
      HTTP_STATUS_INTERNAL_SERVER_ERROR,
      error?.message || error
    );
  }
};

export const loginService = async (dto: ILogin) => {
  try {
    const user = await loginDao(dto);

    const isPasswordOk = await bcrypt.compare(dto?.password, user.password);

    if (isPasswordOk) {
      if (user.verifiedUser) {
        const token = generateToken(user._id);

        return token;
      } else {
        throw new HttpException(HTTP_STATUS_FORBIDDEN, "Account not verified");
      }
    } else {
      throw new HttpException(
        HTTP_STATUS_BAD_REQUEST,
        "Invaild authentication details"
      );
    }
  } catch (error: any) {
    throw new HttpException(
      HTTP_STATUS_INTERNAL_SERVER_ERROR,
      error?.message || error
    );
  }
};

export const verifyUserService = async (code: string) => {
  try {
    const user = await verifiedDao(code);

    const token = generateToken(user._id);

    user.otpCode = undefined;
    user.otpCodeExpire = undefined;

    user.verifiedUser = true;
    await user.save();

    return token;
  } catch (error: any) {
    throw new HttpException(
      HTTP_STATUS_INTERNAL_SERVER_ERROR,
      error?.message || error
    );
  }
};

export const forgotPasswordService = async (email: string) => {
  try {
    const user = await forgotPasswordDao(email);

    generateOtp(user);
    await user.save();

    const emailTemplateSourceForgotPassword = fs.readFileSync(
      "./src/emails/forgotpassword.hbs",
      "utf8"
    );

    const templateData = {
      subject: "Welcome to serviceo. Please verify your email",
      registrationCode: user?.otpCode,
    };

    return await emailManager({
      subject: "Welcome to lundenva. Please verify your email",
      emailSource: emailTemplateSourceForgotPassword,
      templateData,
      user,
    });
  } catch (error: any) {
    throw new HttpException(
      HTTP_STATUS_INTERNAL_SERVER_ERROR,
      error?.message || error
    );
  }
};

export const resetPasswordService = async (body: IResetPassword, user: any) => {
  const { password, confirmPassword } = body;

  try {
    const userdao = await resetPasswordDao(user._id);

    if (password !== confirmPassword) {
      throw new HttpException(HTTP_STATUS_CONFLICT, "Password mismatch");
    }

    userdao.password = await hash(password);

    return await userdao.save();
  } catch (error: any) {
    throw new HttpException(
      HTTP_STATUS_INTERNAL_SERVER_ERROR,
      error?.message || error
    );
  }
};

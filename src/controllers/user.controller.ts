import { Request, Response } from "express";
import { ILogin, IRegister, IUser } from "../interfaces/user.interface";
import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
} from "../constants/status-codes.constant";
import {
  forgotPasswordService,
  loginService,
  registerService,
  resetPasswordService,
  verifyUserService,
} from "../services/user.service";
import { updateUserDao, userDao } from "../dao/user.dao";



/**
 * `POST` /api/auth/register
 */
export const register = async (req: Request, res: Response) => {
  const body = req.body as IRegister;

  res.status(HTTP_STATUS_CREATED).json(await registerService(body));
};

/**
 * `POST` /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
  const body = req.body as ILogin;

  const token = await loginService(body);

  res.status(HTTP_STATUS_OK).json({
    status: "successful",
    token,
  });
};

/**
 * `POST` /api/auth/verify
 */
export const verify = async (req: Request, res: Response) => {
  const { code } = req.body;

  const token = await verifyUserService(code);

  res.status(HTTP_STATUS_OK).json({
    status: "successful",
    token,
  });
};

/**
 * `GET` /api/auth/me
 */
export const getUser = async (req: Request, res: Response) => {
  const { _id } = req.user;

  const user = await userDao(_id);

  res.status(HTTP_STATUS_OK).json({
    status: "successful",
    user,
  });
};

/**
 * `PATCH` /api/auth/me
 */
export const updateUser = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const body = req.body as IUser;

  const user = await updateUserDao(_id, body);

  res.status(HTTP_STATUS_OK).json({
    status: "successful",
    user,
  });
};

/**
 * `POST` /api/auth/forgot-password
 */
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  await forgotPasswordService(email);

  res.status(HTTP_STATUS_OK).json({
    status: "successful",
    message: "Email sent successfully",
  });
};

/**
 * `POST` /api/auth/forgot-password
 */
export const resetPassword = async (req: Request, res: Response) => {
  const body = req.body;

  const user = req.user;

  await resetPasswordService(body, user);

  res.status(HTTP_STATUS_OK).json({
    status: "successful",
    message: "Password reset successfully",
  });
};

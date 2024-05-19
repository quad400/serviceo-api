import { Response } from "express";
import {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_OK,
} from "../../constants/status-codes.constant";
import { HttpException } from "../exceptions/http.exceptions";

export class ResponseUtil {
  static sendSuccess<T>(
    res: Response,
    data?: T,
    message? :string,
    statusCode = HTTP_STATUS_OK
  ): Response<T> {
    return res.status(statusCode).json({
      status: "successful",
      data,
      message
    });
  }

  static sendHttpErrror<T>(
    statusCode: number = HTTP_STATUS_INTERNAL_SERVER_ERROR,
    error: string
  ): Response<T> {
    throw new HttpException(statusCode, error);
  }
}

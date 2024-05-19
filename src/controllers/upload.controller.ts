import { Request, Response } from "express";
import { imageUploader } from "../utils/helpers/cloudinary.helper";
import { HttpException } from "../utils/exceptions/http.exceptions";
import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_OK,
} from "../constants/status-codes.constant";
import { ResponseUtil } from "../utils/helpers/response.helper";

/**
 * `POST` /api/upload
 * @param req image
 * @param res data
 */

const uploader = async (req: Request, res: Response) => {
  const file = req.file;

  try {
    if (!file)
      ResponseUtil.sendHttpErrror(
        HTTP_STATUS_NO_CONTENT,
        "Image file is required"
      );

    // @ts-expect-error
    const url = await imageUploader(file.filename, file.path);

    ResponseUtil.sendSuccess(res, url.url);
  } catch (error: any) {
    ResponseUtil.sendHttpErrror(
      HTTP_STATUS_BAD_REQUEST,
      error?.message || error
    );
  }
};

export default uploader;

import { Request, Response } from "express";
import { imageUploader } from "../utils/helpers/cloudinary.helper";
import { HttpException } from "../utils/exceptions/http.exceptions";
import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_OK,
} from "../constants/status-codes.constant";

const uploader = async (req: Request, res: Response) => {
  // @ts-ignore
  const { file } = req;

  try {
    if (!file)
      throw new HttpException(HTTP_STATUS_NO_CONTENT, "Image file is required");

    const url = await imageUploader(file.filename, file.path);

    res.json(HTTP_STATUS_OK).json({
      status: "Successful",
      url: url,
    });
  } catch (error: any) {
    throw new HttpException(HTTP_STATUS_BAD_REQUEST, error?.message || error);
  }
};

export default uploader
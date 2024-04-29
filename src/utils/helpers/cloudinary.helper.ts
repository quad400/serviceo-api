import { v2 as cloudinary } from "cloudinary";
import { HttpException } from "../exceptions/http.exceptions";
import { HTTP_STATUS_BAD_REQUEST } from "../../constants/status-codes.constant";

export const imageUploader = async (name: string, picture: any) => {
  try {
    const uploader = await cloudinary.uploader.upload(picture, {
      public_id: name,
      folder: "Serviceo",
    });
    return uploader;
  } catch (error: any) {
    throw new HttpException(HTTP_STATUS_BAD_REQUEST, error?.message || error);
  }
};

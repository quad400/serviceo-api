import { Types } from "mongoose";
import { ResponseUtil } from "./response.helper";
import { HTTP_STATUS_NOT_FOUND } from "../../constants/status-codes.constant";

export const validateId = (id: string) => {
  const isValid = Types.ObjectId.isValid(id);
  if (!isValid) {
    ResponseUtil.sendHttpErrror(HTTP_STATUS_NOT_FOUND, `${id} is not a valid id`);
  }
};

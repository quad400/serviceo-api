import { HTTP_STATUS_INTERNAL_SERVER_ERROR } from "../constants/status-codes.constant";
import { serviceDto } from "../dto/service.dto";
import { IService } from "../interfaces/service.interface";
import { IUser } from "../interfaces/user.interface";
import { HttpException } from "../utils/exceptions/http.exceptions";

export const createService = async (user: IUser, body: IService) => {
  try {
    const dto = serviceDto(user, body);
    return dto;
  } catch (error: any) {
    throw new HttpException(
      HTTP_STATUS_INTERNAL_SERVER_ERROR,
      error?.message || error
    );
  }
};

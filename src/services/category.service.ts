import { HTTP_STATUS_INTERNAL_SERVER_ERROR } from "../constants/status-codes.constant";
import { categoryDto } from "../dao/category.dto";
import { ICategory } from "../interfaces/service.interface";
import { IUser } from "../interfaces/user.interface";
import { HttpException } from "../utils/exceptions/http.exceptions";

export const categoryService = async (userId: string, body: ICategory) => {
  try {
    const dto = categoryDto(userId, body);

    return dto;
  } catch (error: any) {
    throw new HttpException(
      HTTP_STATUS_INTERNAL_SERVER_ERROR,
      error?.message || error
    );
  }
};

import { IService } from "../interfaces/service.interface";
import { IUser } from "../interfaces/user.interface";
import { Service } from "../models/service.model";
import User from "../models/user.model";
import {
  DatabaseException,
  ExceptionCodes,
} from "../utils/exceptions/database.exception";

export async function serviceDto(user: IUser, body: IService) {
  const findUser = await User.findOne({ email: user.email });

  if (!findUser) {
    throw new DatabaseException(ExceptionCodes.NOT_FOUND, "User not found");
  }

  const findService = await Service.findOne({ name: body.name });

  if (findService) {
    throw new DatabaseException(
      ExceptionCodes.DUPLICATE_ENTRY,
      "Service name must be unique"
    );
  } else {
    const createdService = await Service.create(body);
    return createdService;
  }
  
}

import { Role } from "../../interfaces/user.interface";
import {
    DatabaseException,
    ExceptionCodes,
  } from "../exceptions/database.exception";
  import { findModel, findModelByData, userFindByIdDao } from "./dao.helper";
  
  export const adminPermission = async (userId: string) => {
    const user = await userFindByIdDao(userId);
  
    if (user.role !== Role.ADMIN) {
      throw new DatabaseException(
        ExceptionCodes.PERMISSION_DENIED,
        "Permission denied"
      );
    }
  };
  
  export const providerPermission = async (userId: string) => {
    const user = await userFindByIdDao(userId);
  
    if (user.role === Role.PROVIDER) {
      throw new DatabaseException(
        ExceptionCodes.PERMISSION_DENIED,
        "Permission denied"
      );
    }
  };
  
  export const isOwnerPermission = async (model:any, modelId:string, ownerId:string) => {
    const _model = await findModelByData(model, { _id: modelId });
  
    const isOwner = _model.createdBy.toString() === ownerId.toString();
    if (!isOwner) {
      throw new DatabaseException(
        ExceptionCodes.PERMISSION_DENIED,
        "Permission denied"
      );
    }
  };
  
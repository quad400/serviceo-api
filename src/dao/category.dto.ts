import { HTTP_STATUS_INTERNAL_SERVER_ERROR } from "../constants/status-codes.constant";
import { ICategory } from "../interfaces/service.interface";
import { IUser } from "../interfaces/user.interface";
import { Category } from "../models/service.model";
import User from "../models/user.model";
import {
  DatabaseException,
  ExceptionCodes,
} from "../utils/exceptions/database.exception";
import { HttpException } from "../utils/exceptions/http.exceptions";
import { duplicateModelEntry, findModelById, updateModel } from "../utils/helpers/dao.helper";
import { adminPermission } from "../utils/helpers/permission.helper";

export async function categoryDto(userId: string,body: ICategory) {
  
  await adminPermission(userId)
  await duplicateModelEntry(Category,{ name: body.name });

  const create = await Category.create(body);

  return create;
}

export async function getCategoryDto(id: string) {
  const category = await findModelById(Category, id);
  return category;
}

export async function updateCategoryDto(id: string, body: ICategory) {
  const category = await updateModel(Category, id, body);
  
  return category;
}

  export async function deleteCategoryDto(id: string) {
   
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw new DatabaseException(
        ExceptionCodes.NOT_FOUND,
        "Category not in database"
      );
    }
    return category;
  }
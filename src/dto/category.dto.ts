import { ICategory } from "../interfaces/service.interface";
import { IUser } from "../interfaces/user.interface";
import { Category } from "../models/service.model";
import User from "../models/user.model";
import {
  DatabaseException,
  ExceptionCodes,
} from "../utils/exceptions/database.exception";

export async function categoryDto(body: ICategory) {
  const findCategory = await Category.findOne({ name: body.name });

  if (findCategory) {
    throw new DatabaseException(
      ExceptionCodes.DUPLICATE_ENTRY,
      "Category name is unique"
    );
  }
  const create = await Category.create(body);

  return create;
}


export async function getCategoryDto(id: string){
  
  try {
    const category = Category.findById(id)
    if(!category){
      throw new DatabaseException(ExceptionCodes.NOT_FOUND, "Category not in database")
    }
    return 
  } catch (error) {
    
  }
}
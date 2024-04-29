import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { ICategory } from "../interfaces/service.interface";
import { categoryService } from "../services/category.service";
import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_OK,
} from "../constants/status-codes.constant";
import { Category } from "../models/service.model";
import { HttpException } from "../utils/exceptions/http.exceptions";

/**
 * `POST` /api/category
 * @param req name, imageUri
 * @param res url
 */

export const createCategory = async (req: Request, res: Response) => {
  const body = req.body as ICategory;

  const service = await categoryService(body);

  res.status(HTTP_STATUS_CREATED).json({
    status: "Successful",
    data: service,
  });
};

/**
 * `GET` /api/category
 */

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    res.status(HTTP_STATUS_OK).json({
      status: "Successful",
      data: categories,
    });
  } catch (error: any) {
    throw new HttpException(
      HTTP_STATUS_INTERNAL_SERVER_ERROR,
      error?.message || error
    );
  }
};

/**
 * `GET` /api/category/:id
 */
export const getCategory = async(req: Request,res: Response)=> {
  try {
    const {id} = req.params
    
  } catch (error) {
    
  }
}

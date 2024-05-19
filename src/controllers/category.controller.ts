import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { ICategory } from "../interfaces/service.interface";
import { categoryService } from "../services/category.service";
import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_OK,
} from "../constants/status-codes.constant";
import { Category } from "../models/service.model";
import { HttpException } from "../utils/exceptions/http.exceptions";
import { ResponseUtil } from "../utils/helpers/response.helper";
import {
  deleteCategoryDto,
  getCategoryDto,
  updateCategoryDto,
} from "../dao/category.dto";

/**
 * `POST` /api/category
 * @param req name, imageUri
 * @param res url
 */

export const createCategory = async (req: Request, res: Response) => {
  const body = req.body as ICategory;
  const {_id} = req.user

  const category = await categoryService(_id, body);

  ResponseUtil.sendSuccess(res, category);
};

/**
 * `GET` /api/category
 */

export const getAllCategory = async (req: Request, res: Response) => {
    const categories = await Category.find();
    ResponseUtil.sendSuccess(res, categories);

 };

/**
 * `GET` /api/category/:id
 */
export const getCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await getCategoryDto(id);

    ResponseUtil.sendSuccess(res, category);
 
};

/**
 * `PATCH` /api/category/:id
 */
export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const category = await updateCategoryDto(id, body);
    ResponseUtil.sendSuccess(res, category);
 };

/**
 * `DELETE` /api/category/:id
 */
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteCategoryDto(id);

    ResponseUtil.sendSuccess(res, undefined, "Category successfully deleted");
  } catch (error: any) {
    ResponseUtil.sendHttpErrror(
      error?.code === "NOT_FOUND"
        ? HTTP_STATUS_NOT_FOUND
        : HTTP_STATUS_INTERNAL_SERVER_ERROR,
      error?.message || error
    );
  }
};

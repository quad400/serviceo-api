import { Request, Response } from "express";
import { IService } from "../interfaces/service.interface";
import { createService, updateService } from "../services/service.service";
import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_CREATED,
} from "../constants/status-codes.constant";
import { ResponseUtil } from "../utils/helpers/response.helper";
import {
  allServiceReviews,
  findAllServiceDao,
  serviceGetDto,
  serviceReviewDao,
} from "../dao/service.dao";
import { Service } from "../models/service.model";
import APIFeatures from "../utils/helpers/paginator.helper";

/**
 * `POST` /api/service
 * @param req: name, imageUri, category, price
 * @param res: data
 */
export const serviceCreate = async (req: Request, res: Response) => {
  const user = req.user;
  const body = req.body as IService;

  const service = await createService(user._id, body);
  ResponseUtil.sendSuccess(res, service);
};

/**
 * `PATCH` /api/service/:id
 * @param req: body, params
 * @param res: data
 */
export const serviceUpdate = async (req: Request, res: Response) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const body = req.body as IService;

  const service = await updateService(id, userId, body);
  ResponseUtil.sendSuccess(res, service);
};

/**
 * `GET` /api/service/:id
 * @param req {id}: params
 * @param res data
 */
export const serviceGet = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const dto = await serviceGetDto(id);
    ResponseUtil.sendSuccess(res, dto);
  } catch (error: any) {
    ResponseUtil.sendHttpErrror(
      HTTP_STATUS_BAD_REQUEST,
      error?.message || error
    );
  }
};

/**
 * `GET` /api/service
 *
 * @param res data
 */
export const serviceGetAll = async (req: Request, res: Response) => {
  const query = req.query;

  const service = await findAllServiceDao(query);

  ResponseUtil.sendSuccess(res, service);
};

export const addReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { _id: userId } = req.user;

  const body = req.body;

  const service = await serviceReviewDao(id, userId, body);

  ResponseUtil.sendSuccess(res, service);
};

export const getAllServiceReviews = async (req: Request, res: Response) => {
  const { id } = req.params;

  const reviews = await allServiceReviews(id);

  ResponseUtil.sendSuccess(res, reviews);
};

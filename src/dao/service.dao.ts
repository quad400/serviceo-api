import { IService } from "../interfaces/service.interface";
import { IUser } from "../interfaces/user.interface";
import { Category, Review, Service } from "../models/service.model";
import User from "../models/user.model";
import {
  DatabaseException,
  ExceptionCodes,
} from "../utils/exceptions/database.exception";
import {
  duplicateModelEntry,
  findModel,
  findModelByData,
  findModelById,
  updateModel,
  userFindByIdDao,
} from "../utils/helpers/dao.helper";
import { validateId } from "../utils/helpers/id.helper";
import { isOwnerPermission } from "../utils/helpers/permission.helper";

export async function serviceDto(userId: string, body: IService) {
  const findUser = await userFindByIdDao(userId);

  const { name, category, ...data } = body;

  await duplicateModelEntry(Service, { name: name });
  await findModelById(Category, category);

  const createdService = await Service.create({
    ...body,
    createdBy: findUser?._id,
  });

  findUser.services?.push(createdService);

  await findUser.save();
  return createdService;
}

export async function serviceUpdateDto(
  id: string,
  userId: string,
  body: IService
) {
  await isOwnerPermission(Service, id, userId);

  await userFindByIdDao(userId);

  const service = updateModel(Service, id, body);

  return service;
}

export async function serviceGetDto(id: string) {
  const service = await findModelById(Service, id);

  return service;
}

export async function findAllServiceDao(query: any) {
  if (query.category) {
    const model = await findModelByData(Category, { name: query.category });
    const service = await findModel(Service, {
      category: model._id.toString(),
    });
    return service;
  }

  const service = await findModel(Service, query);

  return service;
}

export async function serviceReviewDao(
  serviceId: string,
  userId: string,
  body: Record<string, any>
) {
  const user = await userFindByIdDao(userId);
  const service = await findModelById(Service, serviceId);

  const review = await Review.create({ user, service, ...body });

  service.reviews.push(review._id);

  await service.save();
  return service;
}

export async function allServiceReviews(serviceId: string) {
  const reviews = await findModel(Review, {service: serviceId});

  return reviews;
}

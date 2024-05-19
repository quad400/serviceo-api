import { serviceDto, serviceUpdateDto } from "../dao/service.dao";
import { IService } from "../interfaces/service.interface";


export const createService = async (userId: string, body: IService) => {
  const dto = serviceDto(userId, body);
  return dto;
};

export const updateService = async (
  id: string,
  userId: string,
  body: IService
) => {
  const dto = serviceUpdateDto(id, userId, body);
  return dto;
};

import { IUser } from "./user.interface";

export interface ICategory {
  name: string;
  imageUri: string;
  services?: [IService]
}

export interface IReview {
  user: IUser;
  rate: number;
  comment?: string;
}

export interface IService {
  name: string;
  imageUri: string;
  category: ICategory;
  detail?: string;
  price: number;
  discountPercent?: number;
  createdBy: IUser;
  reviews?: [IReview];
}

export interface IBooking {
  user: IUser;
  service: IService;
  datetime: Date;
}

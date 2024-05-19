import { IUser } from "./user.interface";

export interface ICategory {
  name: string;
  imageUri: string;
  services?: [IService]
}

export interface IReview {
  user: IUser;
  rate: number;
  service: IService;
  comment?: string;
  createdAt: Date
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
  service: IService;
  datetime: Date;
  count: number;
  status: string;
  createdBy: IUser;
  address: string;
}

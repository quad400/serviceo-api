import { Schema, model, Types } from "mongoose";
import { ICategory, IService, IReview } from "../interfaces/service.interface";

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  imageUri: {
    type: String,
    required: true
  },
  services: {
    type: [Types.ObjectId],
    ref: "Service",
  }
});

const reviewSchema = new Schema<IReview>({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
});

const serviceSchema = new Schema<IService>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
  detail: {
    type: String,
  },
  imageUri: {
    type: String,
    required: true
  },
  price: {
    type: Number,
  },
  discountPercent: {
    type: Number,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviews: {
    type: [Types.ObjectId],
    ref: "Review",
  },
});

export const Review = model<IReview>("Review", reviewSchema);
export const Category = model<ICategory>("Category", categorySchema);
export const Service = model<IService>("Service", serviceSchema);

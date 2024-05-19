import mongoose from "mongoose";
import User from "../../models/user.model";
import {
  DatabaseException,
  ExceptionCodes,
} from "../exceptions/database.exception";
import { validateId } from "./id.helper";
import Paginator from "./paginator.helper";

export const userFindByIdDao = async (userId: string) => {
  validateId(userId);
  const user = await User.findById(userId).select("-password -__v");

  if (!user) {
    throw new DatabaseException(ExceptionCodes.NOT_FOUND, "User not found");
  }
  return user;
};

/**
 * @param {string} email User email
 * @returns user
 */

export const userFindByEmailDao = async (email: string) => {
  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    throw new DatabaseException(ExceptionCodes.NOT_FOUND, "User not found");
  }
  return user;
};

export const findModelByData = async (
  model: any,
  data: Record<string, any>
) => {
  const _model = await model.findOne(data);
  if (!_model) {
    throw new DatabaseException(
      ExceptionCodes.NOT_FOUND,
      `'${model.collection.collectionName
        .toUpperCase()
        .slice(0, -1)}' not found`
    );
  }
  return _model;
};

export const findModelById = async (model: any, id: any) => {
  validateId(id);
  const _model = await model.findById(id);
  if (!_model) {
    throw new DatabaseException(
      ExceptionCodes.NOT_FOUND,
      `'${model.collection.collectionName
        .toUpperCase()
        .slice(0, -1)}' not found`
    );
  }
  return _model;
};

export const findModel = async (
  model: any,
  query: any,
  paginated = true,
  optionalQuery = {}
) => {
  let _model;
  if (paginated) {
    // Instantiate Paginator with model, query and optionalQuery
    _model = new Paginator(model.find(optionalQuery), query);

    _model.search().filter().sort().limitFields().paginate();

    _model = await _model.paginateResult();
  } else {
    _model = model.find();
  }

  return _model;
};

export const duplicateModelEntry = async (
  model: any,
  data: Record<string, any>
) => {
  const _model = await model.findOne(data);
  if (_model) {
    throw new DatabaseException(
      ExceptionCodes.DUPLICATE_ENTRY,
      `'${model.collection.collectionName
        .toUpperCase()
        .slice(0, -1)}' already exist`
    );
  }
  return _model;
};

export const updateModel = async (
  model: any,
  id: string,
  data: Record<string, any>
) => {
  validateId(id);
  const _model = await model.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!_model) {
    throw new DatabaseException(
      ExceptionCodes.NOT_FOUND,
      `'${model.collection.collectionName
        .toUpperCase()
        .slice(0, -1)}' not found`
    );
  }
  return _model;
};

export const deleteModel = async (model: any, id: string) => {
  validateId(id);

  const _model = await model.findByIdAndDelete(id);

  if (!_model) {
    throw new DatabaseException(
      ExceptionCodes.NOT_FOUND,
      `'${model.collection.collectionName
        .toUpperCase()
        .slice(0, -1)}' not found`
    );
  }
};

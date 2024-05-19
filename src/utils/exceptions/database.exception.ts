import {
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_ACCEPTABLE,
  HTTP_STATUS_NOT_FOUND,
} from "../../constants/status-codes.constant";

export enum ExceptionCodes {
  DUPLICATE_ENTRY = "DUPLICATE_ENTRY",
  NOT_FOUND = "NOT_FOUND",
  PERMISSION_DENIED = "PERMISSION_DENIED"
}

export const ExceptionCodesToStatusCodeMapping = {
  [ExceptionCodes.NOT_FOUND]: HTTP_STATUS_NOT_FOUND,
  [ExceptionCodes.PERMISSION_DENIED] : HTTP_STATUS_FORBIDDEN,
  [ExceptionCodes.DUPLICATE_ENTRY]: HTTP_STATUS_NOT_ACCEPTABLE,
};

export function translateToStatusCode(code: ExceptionCodes) {
  return ExceptionCodesToStatusCodeMapping[code];
}

export class DatabaseException extends Error {
  name: string;
  code: ExceptionCodes;
  message: string;

  constructor(code: ExceptionCodes, message: string) {
    super();

    this.name = this.constructor.name;
    this.code = code;
    this.message = message;

    Object.setPrototypeOf(this, DatabaseException.prototype);
  }
}

import { NextFunction } from "express";
import { AnySchema } from "yup";
import { HTTP_STATUS_BAD_REQUEST } from "../constants/status-codes.constant";
import { HttpException } from "../utils/exceptions/http.exceptions";

export const validator =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error: any) {
      throw new HttpException(HTTP_STATUS_BAD_REQUEST, error.message);
    }
  };

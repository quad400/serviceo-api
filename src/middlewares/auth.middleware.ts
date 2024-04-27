import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { HttpException } from "../utils/exceptions/http.exceptions";
import { HTTP_STATUS_UNAUTHORIZED } from "../constants/status-codes.constant";
import User from "../models/user.model";

type Decoded = {
  _id: string;
};

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      let token;
      token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        next(
          new HttpException(
            HTTP_STATUS_UNAUTHORIZED,
            "bearer token is required"
          )
        );
      }

      
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Decoded;
      
      req.user = await User.findById(decoded._id).select("-password");

      next();
    } else {
      next(new HttpException(HTTP_STATUS_UNAUTHORIZED, "user not authorized"));
    }
  } catch (error: any) {
    next(
      new HttpException(
        HTTP_STATUS_UNAUTHORIZED,
        error?.message || "invalid token"
      )
    );
  }
};

export default protect;

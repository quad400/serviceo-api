import { Request, Response } from "express";
import { IService } from "../interfaces/service.interface";
import { createService } from "../services/service.service";
import { HTTP_STATUS_CREATED } from "../constants/status-codes.constant";





/**
 * `POST` /api/service
 */
export const serviceCreate = async(req: Request, res: Response)=>{
    
    const user = req.user
    const body = req.body as IService

    const service = await createService(user, body)
    res.status(HTTP_STATUS_CREATED).json({
        status: "Successfully",
        data: service
    })
}
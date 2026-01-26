import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { analyzeCv } from "./analyzecv.service";
import sendResponse from "../../utils/sendResponse";


export const analyzeCvController = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

if (!req.user) {
      return res.status(401).json({ message: "Unauthorized"});
    }
    const userId = req.user._id;
     const result = await analyzeCv(userId);
sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Analyze successfully",
      data: result,
    });
  })








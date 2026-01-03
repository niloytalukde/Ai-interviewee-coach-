import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authServices.registerUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      data: user,
    });
  }
);



export const authController={registerUser}
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../middleware/AppError";
import { createUserToken } from "../../utils/createUserToken";
import { setAuthCookie } from "../../utils/setAuthCookie";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authServices.registerUser(req.body);

if(!user){
  throw new AppError(404,"User Not found")
}
// create User Token here 
const tokenInfo = createUserToken(user)
// setToken on cookie Here 
setAuthCookie(res,tokenInfo)

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message:"User Created Successfully",
      data: user,
    });
  }
);

const googleCallback = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const user= req.user
if(!user){
  throw new AppError(404,"User Not found")
}
// create User Token here 
const tokenInfo = createUserToken(user)
// setToken on cookie Here 
setAuthCookie(res,tokenInfo)
// After complete login  redirect user on Frontend 
res.redirect(process.env.FRONTEND_URL!);
})

 const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
     
    await authServices.logout(res)

 sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User logged out successfully",
        data: null,
      });

  }
);

const login =catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const userInfo= await authServices.login(req.body)
const {tokenInfo,user}=userInfo
setAuthCookie(res,tokenInfo)
sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User logged In successfully",
        data: user,
      });
})



export const authController={registerUser,googleCallback,logout,login}
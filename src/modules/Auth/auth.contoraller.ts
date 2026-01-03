import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../middleware/AppError";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authServices.registerUser(req.body);
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
console.log(user);

if(!user){
  throw new AppError(404,"User Not found")
}

// create User Token here 



// setToken Here 




// redirect user on Frontend 
res.redirect(process.env.FRONTEND_URL!);

})


export const authController={registerUser,googleCallback}
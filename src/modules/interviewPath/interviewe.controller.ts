import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { interviewServices } from "./interview.service";

const startInterview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body);
    const { position,skill,experience, topic}=req.body
    const data = await interviewServices.startInterview(position,skill,experience,topic)
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Start Interview successfully",
      data: data,
    });
  }
);

const feedback=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const {question, answer}=req.body

    const feedback= await interviewServices.feedback(question,answer)

    console.log(feedback);

 sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Send Feedback successfully",
      data: feedback,
    });
})


export const interviewController = {startInterview, feedback}
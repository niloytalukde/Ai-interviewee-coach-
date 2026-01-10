import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { interviewServices } from "./interview.service";
import AppError from "../../middleware/AppError";

const startInterview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const userEmail=req.user  as string

    if (!userEmail){
      throw new AppError(400,"User Email ")
    }
  
    const { jobPosition,jobDescription,timeDuration, types}=req.body

    console.log(req.body);
    const data = await interviewServices.startInterview(jobPosition,jobDescription,timeDuration, types,userEmail)
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

    const feedbackData= await interviewServices.feedback(question,answer)

   let feedback;
try {
  feedback = typeof feedbackData === 'string' ? JSON.parse(feedbackData) : feedbackData;
} catch (err) {
  feedback = { raw: feedbackData };
}


console.log(feedback);

 sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Send Feedback successfully",
      data: feedback,
    });
})


export const interviewController = {startInterview, feedback}
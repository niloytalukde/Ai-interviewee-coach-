import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { createCvUpload } from "./sortout.services";


const cvUpload = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { jobTitle, jobDescription } = req.body;

    if (!jobTitle || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job title and job description are required",
      });
    }

    if (!req.files || !(req.files as Express.Multer.File[]).length) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one CV",
      });
    }

    const filePaths = (req.files as Express.Multer.File[]).map(
      (file) => file.path
    );
const userId =req?.user?._id
    const result = await createCvUpload({
userId,
      jobTitle,
      jobDescription,
      filePaths,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  }
);

export default cvUpload;


import { Types } from "mongoose";
import { CvUpload } from "./sortout.model";

interface CreateCvUploadParams {
  userId: Types.ObjectId;
  jobTitle: string;
  jobDescription: string;
  filePaths: string[];
}

export const createCvUpload = async ({
  userId,
  jobTitle,
  jobDescription,
  filePaths,}: CreateCvUploadParams) => {


  return await  CvUpload.create({
    userId,
    jobTitle,
    jobDescription,
    cvs: filePaths,
  });
};

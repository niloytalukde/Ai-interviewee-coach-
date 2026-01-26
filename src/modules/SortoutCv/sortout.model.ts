import mongoose, { Schema, Types, } from "mongoose";

export interface ICvUpload {
  userId: Types.ObjectId;
  jobTitle: string;
  jobDescription: string;
  cvs: string[]; 
  createdAt: Date;
  updatedAt: Date;
}

const cvUploadSchema = new Schema<ICvUpload>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },

    cvs: {
      type: [String], 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CvUpload = mongoose.model("CvUpload", cvUploadSchema);

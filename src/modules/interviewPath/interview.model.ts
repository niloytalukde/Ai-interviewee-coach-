import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true, // Problem Solving | Technical | Behavioral
    },
  },
  { _id: false }
);

const interviewSessionSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    jobType: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    duration: {
      type: String, 
      required: true,
    },

    questions: {
      type: [questionSchema],
      required: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export default mongoose.model(
  "InterviewSession",
  interviewSessionSchema
);

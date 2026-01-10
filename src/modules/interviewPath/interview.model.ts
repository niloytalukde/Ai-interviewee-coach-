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
      trim: true,
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
      index: true,
    },

    jobType: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    duration: {
      type: String, //  "30 mins", "1 hour", "45 minutes"
      required: true,
      trim: true,
    },

    questions: {
      type: [questionSchema],
      required: true,
      validate: [
        (v: any[]) => v.length > 0,
        "At least one question is required",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.InterviewSession ||
  mongoose.model("InterviewSession", interviewSessionSchema);

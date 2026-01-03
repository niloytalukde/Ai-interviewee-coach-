import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info(` MongoDB Connected SuccessFul`);
  } catch (error) {
    logger.error(" MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;

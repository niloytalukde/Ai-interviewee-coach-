import express from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/golbalErrorHandeler";
import logger from "./utils/logger";

const app = express();

app.use(cors());
app.use(express.json());

// routes 



app.use(globalErrorHandler);

export default app;

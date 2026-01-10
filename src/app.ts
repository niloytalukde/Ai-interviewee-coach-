import dotenv from "dotenv";
dotenv.config()
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/golbalErrorHandeler";
import "./utils/logger";
import passport from "passport"
import expressSession from "express-session"
import "./config/passport"
import router from "./routes";
import cookieParser from "cookie-parser"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(expressSession({
    secret:"Secret",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

// routes 

app.use("/api/v1",router)

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      success: true,
      message: "API is running ",
    });
  } catch (error) {
    next(error);
  }
});

app.use(globalErrorHandler);

export default app;

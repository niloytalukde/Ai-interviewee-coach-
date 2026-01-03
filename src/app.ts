import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/golbalErrorHandeler";
import "./utils/logger";
import passport from "passport"
import expressSession from "express-session"
import "./config/passport"
import router from "./routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use(expressSession({
    secret:"Secret",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())

// routes 

app.use("/api/v1",router)

app.use(globalErrorHandler);

export default app;

import dotenv from "dotenv";
dotenv.config()
import express from "express";

import cors from "cors";
import globalErrorHandler from "./middleware/golbalErrorHandeler";
import logger from "./utils/logger";
import passport from "passport"
import expressSession from "express-session"
import "./config/passport"
const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())
app.use(expressSession({
    secret:"Secret",
    resave:false,
    saveUninitialized:false
}))

// routes 



app.use(globalErrorHandler);

export default app;

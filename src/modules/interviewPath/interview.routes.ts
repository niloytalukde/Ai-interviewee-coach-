import { Router } from "express";
import { interviewController } from "./interviewe.controller";




const interviewRoutes=Router()

interviewRoutes.post("/start-interview",interviewController.startInterview)
interviewRoutes.post("/feedback",interviewController.feedback)



export default interviewRoutes 
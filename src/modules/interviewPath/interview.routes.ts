import { Router } from "express";
import { interviewController } from "./interviewe.controller";
import { checkAuth } from "../../middleware/checkAuth";

const interviewRoutes = Router();

interviewRoutes.post(
  "/start-interview",
checkAuth("user"),
  interviewController.startInterview
);

interviewRoutes.post(
  "/feedback",
  interviewController.feedback
);

interviewRoutes.get(
  "/single-session",
  interviewController.getSessionById
);

export default interviewRoutes;

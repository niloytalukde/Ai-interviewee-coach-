import { Router } from "express";
import authRouter from "../modules/Auth/auth.routes";
import interviewRoutes from "../modules/interviewPath/interview.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/interview",
    route: interviewRoutes,
  },
  

];

//  Dynamically register all routes
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

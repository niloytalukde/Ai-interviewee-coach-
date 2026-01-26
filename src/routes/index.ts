import { Router } from "express";
import authRouter from "../modules/Auth/auth.routes";
import interviewRoutes from "../modules/interviewPath/interview.routes";
import sortOutRouter from "../modules/SortoutCv/sortout.routes";
import analyzerRouter from "../modules/analyzeCv/analyzecv.routes";

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
   {
    path: "/sort-out",
    route: sortOutRouter,
  },
  {
    path: "/analyze",
    route: analyzerRouter,
  },

];

//  Dynamically register all routes
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

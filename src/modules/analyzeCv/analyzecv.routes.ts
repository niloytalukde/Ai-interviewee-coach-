import { Router } from "express";
import { analyzeCvController } from "./analyzecv.controller";
import { checkAuth } from "../../middleware/checkAuth";


const analyzerRouter = Router();

analyzerRouter.get("/cv",checkAuth("user") ,analyzeCvController);

export default analyzerRouter
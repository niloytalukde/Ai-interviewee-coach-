import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import cvUpload from "./sortout.controller";
import { multerUpload } from "../../config/multer.config";




const sortOutRouter = Router()


sortOutRouter.post("/upload",checkAuth("user"),multerUpload.array("cvs"),cvUpload)


export  default sortOutRouter
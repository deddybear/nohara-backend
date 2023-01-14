"use strict";

import multer from "multer";
import Express from "express";
import { getList, create } from "../controllers/CaraouselController.js";
import { verifyToken } from "../middleware/verifyJwtToken.js";
import { diskStorage, configMulter } from "../middleware/multerStorage.js";


const upload = multer({
  storage: diskStorage("caraousel"),
  limits: { fieldSize: configMulter.filesize },
  fileFilter: configMulter.fileFilter,
}).array("photo", 3);
const router = Express.Router();

/* GET users listing. */
router.get("/list", getList);

//* create data caraousel
router.post("/create", [verifyToken, upload], create);
export default router;

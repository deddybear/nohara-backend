"use strict";

import multer from "multer";
import Express from "express";
import { getList, create, destroy, countData } from "../controllers/CaraouselController.js";
import { verifyToken } from "../middleware/verifyJwtToken.js";
import { diskStorage, configMulter } from "../middleware/multerStorage.js";
const router = Express.Router();

const upload = multer({
  storage: diskStorage("caraousel"),
  limits: { fieldSize: configMulter.filesize },
  fileFilter: configMulter.fileFilter,
}).array("photo", 3);


/* GET users listing. */
router.get("/list", getList);

// router.get("/total", countData);

//* create data caraousel and middleware verifyToken upload
router.post("/create", [verifyToken, upload], create);

//* delete data with params id and middleware verifyToken
router.delete("/delete/:id", [verifyToken], destroy);
export default router;

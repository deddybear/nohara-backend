//* Layanan Kami

"use strict";

import multer from "multer";
import Express from "express";
import { verifyToken } from "../middleware/verifyJwtToken.js";
import { getList, create, destroy } from "../controllers/ServiceController.js";
import { diskStorage, configMulter } from "../middleware/multerStorage.js";
const router = Express.Router();

const upload = multer({
  storage: diskStorage("pelayanan"),
  limits: { fieldSize: configMulter.filesize },
  fileFilter: configMulter.fileFilter,
}).array("photo", 3);

//* fecth data services with queryparams limit and offset 
router.get("/list", getList);

//* create data caraousel and middleware verifyToken upload
router.post("/create", [verifyToken, upload], create);

//* delete data with params id and middleware verifyToken
router.delete("/delete/:id", [verifyToken], destroy);
export default router;

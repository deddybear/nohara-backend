//* Protofolio

"use strict";

import multer from "multer";
import Express from "express";
import { verifyToken } from "../middleware/verifyJwtToken.js";
import {
  getList,
  create,
  destroy,
} from "../controllers/ProtofolioController.js";
import { diskStorage, configMulter } from "../middleware/multerStorage.js";
const router = Express.Router();

const upload = multer({
  storage: diskStorage("protofolio"),
  limits: { fieldSize: configMulter.filesize },
  fileFilter: configMulter.fileFilter,
}).array("photo", 3);

//* fetch data protofolio with queryparams limit and offset
router.get("/list", getList);

//* create new data protofolio with middleware verifyToken upload
router.post("/create", [verifyToken, upload], create);

//* delete data with params id with middleware verifyToken
router.delete("/delete/:id", [verifyToken], destroy);
export default router;

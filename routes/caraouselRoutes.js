"use strict";

import Express from "express";
import { getList, create } from "../controllers/CaraouselController.js";
const router = Express.Router();
import multer from "multer";

// menentukan lokasi pengunggahan
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

/* GET users listing. */
router.get("/list", getList);

//* create data caraousel
router.post("/create", multer({storage: diskStorage}).array('photo', 3), create);
export default router;

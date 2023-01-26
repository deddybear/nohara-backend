//* About / Contact Routest

"use strict";
import Express from "express";
import { verifyToken } from "../middleware/verifyJwtToken.js";
import {
  getInformation,
  updateInformation,
} from "../controllers/ContactController.js";

const router = Express.Router();

//* fetch contact information
router.get("/", getInformation);
//* update contact information
router.patch("/update/:select", [verifyToken], updateInformation);

export default router;

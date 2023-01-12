'use strict'
import Express from "express";
import { loginUser, createUser } from "../controllers/UsersController.js";
const router = Express.Router();

/**
 * POST METHOD FOR LOGIN USER
 * function in file Usercontroller
 * function name : createUser
 */
router.post("/create", createUser);

/**
 * POST METHOD FOR LOGIN USER
 * function in file Usercontroller
 * function name : loginUser
 */
router.post("/login", loginUser);

export default router;

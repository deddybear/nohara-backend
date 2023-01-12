"use strict";

import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { Api as msgApi } from "../lib/Messages.js";

export const createUser = async (req, res) => {
  try {
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(`body : ${username}, ${password}`);
    const user = await Users.query().select('id', 'username', 'password').findOne("username", username);

    //* if data user is not found 
    if (!user) {
      return res.status(500).send(msgApi(500, "User not Found"));
    }

    //* check validation password
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
        return res.status(401).json(msgApi(401, "Username or Password are invalid !"))
    }

    const token = Jwt.sign({id: user.id}, )
    return res.status(200).json(req.body);
  } catch (error) {
    // console.log(error);
    return res.status(500).json(msgApi(500, "Internal Server Error"));
  }
};

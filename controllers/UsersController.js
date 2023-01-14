"use strict";

import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { Api as msgApi, success } from "../lib/Messages.js";

export const createUser = async (req, res) => {
  try {
    res.status(200).send(req.body);
  } catch (error) {
    res.status(500).send(error);
  }
};  

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(`body : ${username}, ${password}`);
    const user = await Users.query()
      .select("id", "username", "email", "password")
      .findOne("username", username);

    //* if data user is not found
    if (!user) {
      return res.status(500).send(msgApi(500, "User not Found"));
    }

    //* check validation password
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res
        .status(401)
        .send(msgApi(401, "Username or Password are invalid !"));
    }

    //* create token
    const token = Jwt.sign({ id: user.id }, process.env.API_SECRET, {
      expiresIn: "20m",
    });

    //* return respone while is success
    return res
      .status(200)
      .send(
        success(200, "Login successfull", {
          user: { id: user.id, username: user.username, email: user.email },
          token: `Viscape ${token}`,
        })
      );
  } catch (error) {
    // console.log(error);
    return res.status(500).send(msgApi(500, "Internal Server Error"));
  }
};

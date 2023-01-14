import Jwt from "jsonwebtoken";
import { Api as msgApi } from "../lib/Messages.js";
const API_SECRET = process.env.API_SECRET;

// https://medium.com/@nico26deo/membuat-autentikasi-jwt-pada-restful-api-dengan-express-js-sequelize-js-da623653abdd
// https://flaviocopes.com/express-headers/

export const verifyToken = async (req, res, next) => {
  try {
    const tokenHeader = req.header("x-access-token");

    //* check header access token while header access null -> get response error
    if (!tokenHeader) {
      return res.status(400).send(msgApi(400, "Authorization Token Not Found"));
    }

    //* split value of token header
    const token = tokenHeader.split(" ");

    //* check if token not in format get response error
    if (token[0] !== "Viscape" || !token[1]) {
      return res.status(400).send(msgApi(400, "Invalid Authorization Token"));
    }

    //* verify header acces token 
    Jwt.verify(token[1], API_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .send(msgApi(400, "Failed decode Authorization Token"));
      }

      req.id = decoded.id;
      next();
    });
  } catch (error) {

    res.status(500).send(msgApi(500, "Internal Server Error"));
  }
};

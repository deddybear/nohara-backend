//* controller for editing about company
"use strict";
import moment from "moment/moment.js";
import knex from "../config/knex.js";
import { Api as msgApi, success } from "../lib/Messages.js";
import Contact from "../models/Contact.js";

export const getInformation = async (req, res) => {
  try {
    const data = await Contact.query()
      .select(
        "description",
        "address",
        "whatsapp",
        "telephone",
        "email",
        "facebook",
        "instagarm",
        "tiktok"
      )
      .findById(1);

    res.status(200).send(success(200, "success", data));
  } catch (error) {
    console.log(error);

    return res.status(500).send(msgApi(500, "Internal Server Error"));
  }
};

export const updateInformation = async (req, res) => {
  //* create date time gmt+7 and now
  const time = moment().local("id").format("YYYY-MM-DD HH:mm:ss");
  const columnSelected = req.params.select;
  //* get data form request client
  const requestBody = req.body;

  try {
    const resultUpdate = await Contact.query().findById(1).patch({
      [columnSelected]: requestBody[columnSelected],
      updated_at: time
    });

    res.status(200).send(success(200, "success", time));
  } catch (error) {
    console.log(error);

    return res.status(500).send(msgApi(500, "Internal Server Error"));
  }
};

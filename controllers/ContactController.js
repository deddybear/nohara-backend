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
        "id",
        "desc_company",
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
  const {
    desc_company,
    address,
    whatsapp,
    telephone,
    email,
    facebook,
    instagarm,
    tiktok,
  } = req.body;
  try {
    const resultUpdate = await Contact.query().findById(1).patch({
      desc_company: desc_company,
      address: address,
      whatsapp: whatsapp,
      telephone: telephone,
      email: email,
      facebook: facebook,
      instagarm: instagarm,
      tiktok: tiktok,
      updated_at: time
    });

    res.status(200).send(success(200, "success", resultUpdate));
  } catch (error) {
    console.log(error);

    return res.status(500).send(msgApi(500, "Internal Server Error"));
  }
};

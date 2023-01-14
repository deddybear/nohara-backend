"use strict";

import { v4 } from "uuid";
import Caraousel from "../models/Caraousel.js";
import { Api as msgApi, success } from "../lib/Messages.js";
import CollectionPhotos from "../models/CollectionPhotos.js";
import moment from "moment/moment.js";
import fs from "fs";
import { transaction } from "objection";
import knex from "../config/knex.js";

export const getList = async (req, res) => {
  const offset = req.query.offset ?? "0";
  const limit = req.query.limit ?? "10";

  try {
    const data = await Caraousel.query()
      .select("caraousel.*", "p.path")
      .joinRelated("CollectionPhotos", { alias: "p" })
      .offset(offset)
      .limit(limit);

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(msgApi(500, "Internal Server Error"));
  }
};

export const create = async (req, res) => {
  const time = moment().local("id").format("YYYY-MM-DD HH:mm:ss");
  const files = req.files;

  if (files.length <= 0) {
    return res.status(400).send(msgApi(400, "File Not Found"));
  }

  const transaction = await knex.transaction();
  try {

    for (const key in files) {
        const photos = await CollectionPhotos.query(transaction).insert({
            id: v4(),
            path: `/static/caraousel/${files[key].filename}`,
            created_at: time,
          });
    
         await Caraousel.query(transaction).insert({
            id: v4(),
            photos_id: photos.id,
            name: req.body.name,
            created_at: time,
          });
    }

    transaction.commit();
 
    return res.status(200).send({ file: files });
  } catch (error) {
    console.log(error);
    files.forEach(function (item) {
      fs.unlink(item.path);
    });

    await transaction.rollback();
    return res.status(500).send(msgApi(500, "Internal Server Error"));
  }
};

export const destroy = async (req, res) => {
  const { id } = req.params.id;
  try {
    await CollectionPhotos.query().findById(id).delete();
    return res.status(200).send(msgApi(200, "success"));
  } catch (error) {
    console.log(error);
    return res.status(500).send(msgApi(500, "Internal Server Error"));
  }
};

"use strict";

import fs from "fs";
import moment from "moment/moment.js";
import knex from "../config/knex.js";
import { v4 } from "uuid";
import Protofolio from "../models/Protofolio.js";
import { Api as msgApi, success } from "../lib/Messages.js";
import CollectionPhotos from "../models/CollectionPhotos.js";
import path from "path";
const __dirname = path.resolve();

//* function for get list with queryparmas offset and limit
//* for pagination
export const getList = async (req, res) => {
  //* get params offset at url
  const offset = req.query.offset ?? "0";
  //* get params limit at url
  const limit = req.query.limit ?? "8";

  //* if offset or limit is null
  //* set default offset = 0
  //* set default limit = 8

  try {
    //* query to get data where offset and limit has been set before
    const data = await Protofolio.query()
      .select("p.id", "protofolio.created_at", "protofolio.name", "p.path")
      .joinRelated("CollectionPhotos", { alias: "p" })
      .orderBy("created_at", "desc")
      .offset(offset)
      .limit(limit);

    //* query count column id as total_data
    const count = await Protofolio.query().count("protofolio.id as total_data");

    //* return response with result query
    res
      .status(200)
      .send(success(200, "success", { total: count[0].total_data, data }));
  } catch (error) {
    console.log(error);
    return res.status(500).send(msgApi(500, "Internal Server Error"));
  }
};

//* function for create new post protofolio
export const create = async (req, res) => {
  //* create date time gmt+7 and now
  const time = moment().local("id").format("YYYY-MM-DD HH:mm:ss");

  //* get request files / photos
  const files = req.files;
  //   console.log(files);
  //* if not have files / photos
  if (files.length <= 0) {
    return res.status(400).send(msgApi(400, "File Not Found"));
  }

  //* db transaction begin
  const transaction = await knex.transaction();

  try {
    //* looping file and insert to db tabel collection_photos and protofolio
    for (const key in files) {
      //* insert data to tabel collection photos
      const photos = await CollectionPhotos.query(transaction).insert({
        id: v4(),
        path: `/static/protofolio/${files[key].filename}`,
        created_at: time,
      });

      //* insert data to tabel protofolio
      await Protofolio.query(transaction).insert({
        id: v4(),
        photos_id: photos.id,
        name: req.body.name,
        created_at: time,
      });
    }

    //* commit db transaction
    transaction.commit();

    //* retun response 200
    return res
      .status(200)
      .send(success(200, "Create new Post Protofolio success !", v4()));
  } catch (error) {
    //* log error
    console.log(error);

    //* remove file have been upload in server
    files.forEach(function (item) {
      fs.unlink(item.path);
    });

    //* db transaction rollback
    await transaction.rollback();

    //* return response 500
    return res.status(500).send(msgApi(500, "Internal Server Error"));
  }
};

//* function delete data caraousel
export const destroy = async (req, res) => {
  //* get params id in url
  const { id } = req.params;
  const transaction = await knex.transaction();

  try {
    //* because caraosel have foreign key CollectionPhotos
    const data = await CollectionPhotos.query(transaction)
      .select("id", "path")
      .findById(id);

    //* check if data is null or path is null
    if (!data) {
      return res.status(404).send(msgApi(404, "Data Not Found"));
    }

    //* query delete at collection photos
    const result = await CollectionPhotos.query(transaction).deleteById(
      data.id
    );

    //* if query delete at collection photos is not success
    if (!result) {
      return res
        .status(500)
        .send(msgApi(500, "Failed Deleted Data in Database"));
    }

    //* get file path at index 3 coz split by function
    const pathFile = data.path.split("/");

    //* delete file selected path
    fs.unlinkSync(
      path.join(__dirname, `public/images/${pathFile[2]}/${pathFile[3]}`),
      (err) => {
        if (err) return res.status(404).send(msgApi(404, "Data Not Found"));
      }
    );

    //* commit db transaction
    transaction.commit();

    //* retun response 200 success
    return res
      .status(200)
      .send(msgApi(200, "Delete Data File and Database is success !"));
  } catch (error) {
    console.log(error);

    //* db transaction rollback
    await transaction.rollback();

    //* return response error 500
    return res.status(500).send(msgApi(500, "Internal Server Error"));
  }
};

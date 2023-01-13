"use strict";

import Caraousel from "../models/Caraousel.js";
import { Api as msgApi, success } from "../lib/Messages.js";
import CollectionPhotos from "../models/CollectionPhotos.js";
import path from "path";

export const getList = async (req, res) => {
  const offset = req.query.offset ?? "0";
  const limit = req.query.limit ?? "10";

  try {
    const data = await Caraousel.query()
      .joinRelated("CollectionPhotos", { alias: "p" })
      .offset(offset)
      .limit(limit);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(msgApi(500, "Internal Server Error"));
  }
};

export const create = async (req, res) => {
  try {
    const file = req.file.path;
    const name = req.body.name;


    // const photos = await CollectionPhotos.query().;
    // await Caraousel.query().insert();


    return res.status(200).json({file : file, name: name});
  } catch (error) {
    console.log(error);
    return res.status(500).json(msgApi(500, "Internal Server Error"));
  }
};

export const destroy = async (req, res) => {
  const { id } = req.params.id;
  try {
    await Caraousel.query().findById(id).delete();
    return res.status(200).json(msgApi(200, "success"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(msgApi(500, "Internal Server Error"));
  }
};

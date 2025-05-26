"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const DB = "E-Commerce";
const ITEMS_COLLECTION = "items";

const getItemById = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { id } = req.params;

  try {
    await client.connect();
    const db = client.db(DB);
    const item = await db
      .collection(ITEMS_COLLECTION)
      .findOne({ _id: parseInt(id) });

    if (!item) {
      return res
        .status(404)
        .json({ status: 404, error: `No item found with id ${id}` });
    }

    res.status(200).json({
      status: 200,
      item,
    });
  } catch (error) {
    console.error("Error retrieving item:", error);
    res.status(500).json({ status: 500, error: "Failed to retrieve item" });
  } finally {
    await client.close();
  }
};

module.exports = { getItemById };

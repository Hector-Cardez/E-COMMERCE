"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getNumberInStock = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const itemId = parseInt(req.params.id);

  try {
    await client.connect();
    const db = client.db("E-Commerce");

    const item = await db.collection("items").findOne({ _id: itemId });

    if (!item) {
      return res.status(404).json({ status: 404, message: "Item not found" });
    }

    res
      .status(200)
      .json({ status: 200, itemId, numberInStock: item.numInStock });
  } catch (error) {
    console.error("Error retrieving item stock:", error);
    res
      .status(500)
      .json({ status: 500, error: "Failed to retrieve item stock" });
  } finally {
    await client.close();
  }
};

module.exports = { getNumberInStock };

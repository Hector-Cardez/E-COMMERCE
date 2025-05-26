"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("E-Commerce");
    const items = await db.collection("items").find().toArray();
    res.status(200).json({ status: 200, items });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ status: 500, error: "Failed to retrieve items" });
  } finally {
    await client.close();
  }
};

module.exports = { getItems };

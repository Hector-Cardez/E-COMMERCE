"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const CARTS_COLLECTION = "carts";
const userId = "e62a17e5-9c48-4a71-b7d8-1e2e7c6fcf3b";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("E-Commerce");
    let cart = await db.collection(CARTS_COLLECTION).findOne({ userId });
    if (cart)
      return res
        .status(200)
        .json({ status: 200, message: "Here is your cart.", cart: cart });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ status: 500, error: "Failed to retrieve cart" });
  } finally {
    await client.close();
  }
};

module.exports = { getCart };

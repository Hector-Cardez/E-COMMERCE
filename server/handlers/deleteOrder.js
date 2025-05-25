"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const ORDERS_COLLECTION = "orders";

const deleteOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const order = await req.params;

  try {
    await client.connect();
    const db = client.db("E-Commerce");
    await db.collection(ORDERS_COLLECTION).deleteOne({ _id: order });
    client.close();
    return res
      .status(200)
      .json({ status: 200, message: "Order successfully deleted." });
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = { deleteOrder };

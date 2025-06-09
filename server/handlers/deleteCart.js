"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const deleteCart = async (req, res) => {
  const { userId } = req.params;
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db("E-Commerce");

    const result = await db.collection("carts").deleteOne({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Cart not found or already empty.",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Cart emptied successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Server error." });
  } finally {
    client.close();
  }
};

module.exports = { deleteCart };

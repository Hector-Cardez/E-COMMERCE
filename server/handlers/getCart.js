"use strict";

const { MongoClient } = require("mongodb");
const { validate: uuidValidate } = require("uuid");
require("dotenv").config();
const { MONGO_URI } = process.env;

const CARTS_COLLECTION = "carts";

const getCart = async (req, res) => {
  const { userId } = req.params;

  // Validate userId UUID
  if (!userId || !uuidValidate(userId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid or missing userId in params.",
    });
  }

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("E-Commerce");

    let cart = await db.collection(CARTS_COLLECTION).findOne({ userId });

    // Create empty cart if not found
    if (!cart) {
      cart = { userId, items: [] };
      await db.collection(CARTS_COLLECTION).insertOne(cart);
    }

    return res.status(200).json({
      status: 200,
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  } finally {
    await client.close();
  }
};

module.exports = { getCart };

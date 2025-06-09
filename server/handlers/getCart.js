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
    const db = client.db("E-Commerce");
    const cart = await db.collection(CARTS_COLLECTION).findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        status: 404,
        message: "Cart not found.",
      });
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

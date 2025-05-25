const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const ORDERS_COLLECTION = "orders";
const userId = "e62a17e5-9c48-4a71-b7d8-1e2e7c6fcf3b";

const createOrder = async (req, res) => {
  const requiredKeys = ["fullName", "phone", "address", "email"];
  if (
    requiredKeys.some((key) => {
      if (!req.body[key] || typeof req.body[key] !== "string") {
        res.status(400).json({
          status: 400,
          message: `Error, body must contain a key of ${key}, whose value is a string.`,
        });
        return true;
      }
    })
  ) {
    return;
  }

  const { fullName, phone, address, email } = req.body;
  const client = new MongoClient(MONGO_URI);
  try {
    const db = client.db("E-Commerce");
    const foundCart = await db.collection("carts").findOne({
      userId: userId,
    });
    const cartItems = foundCart.items;
    // const items = db.collection("items").find().toArray();

    if (!foundCart) {
      return res.status(404).json({
        status: 404,
        message: `Error, cannot find the cart.`,
      });
    }

    const newOrder = {
      _id: uuidv4(),
      contactInfo: {
        fullName,
        phone,
        address,
        email,
      },
      items: cartItems,
    };

    const insertedOrder = await db
      .collection(ORDERS_COLLECTION)
      .insertOne(newOrder);
    if (!insertedOrder || !insertedOrder.insertedId) {
      res.status(500).json({
        status: 500,
        message: "Mongo error while creating new order.",
      });
    } else {
      res.status(201).json({
        status: 201,
        _id: insertedOrder.insertedId,
        items: cartItems,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  } finally {
    client.close();
  }
};

module.exports = { createOrder };

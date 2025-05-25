"use strict";

const { MongoClient } = require("mongodb");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
require("dotenv").config();
const { MONGO_URI } = process.env;

const CARTS_COLLECTION = "carts";
const userId = "e62a17e5-9c48-4a71-b7d8-1e2e7c6fcf3b";

const cartHandler = async (req, res) => {
  const { itemId, quantity, action } = req.body;

  // Validate UUID
  if (!userId || !uuidValidate(userId)) {
    return res.status(400).json({
      status: 400,
      message: "Error, body must contain a valid 'userId' (UUID).",
    });
  }

  // Validate action
  if (!action || !["add", "remove"].includes(action)) {
    return res.status(400).json({
      status: 400,
      message: "Error, 'action' must be 'add' or 'remove' only.",
    });
  }

  const client = new MongoClient(MONGO_URI);
  try {
    const db = client.db("E-Commerce");

    // Check if cart exists
    let cart = await db.collection(CARTS_COLLECTION).findOne({ userId });

    if (!cart && action !== "add") {
      return res.status(404).json({
        status: 404,
        message: `Error, cannot find cart for user ${userId}.`,
      });
    }

    // Create a new cart if cart doesn't exist
    if (!cart && action === "add") {
      const newCart = {
        userId,
        items: [],
      };
      const result = await db.collection(CARTS_COLLECTION).insertOne(newCart);
      return res.status(201).json({
        status: 201,
        cartId: result.insertedId,
        message: "Cart created successfully.",
      });
    }

    // Check if item already exists
    if (action === "add") {
      const existingItem = cart.items.find((item) => item.itemId === itemId);
      const item = await db
        .collection("items")
        .findOne({ _id: parseInt(itemId) });
      const itemImageSrc = item.imageSrc;
      const itemName = item.name;
      const itemPrice = item.price;
      const isItemInStock = item.numInStock > 0;
      const isQuantityTooMuch = () => existingItem.quantity > item.numInStock;

      if (!isItemInStock) {
        return res.status(400).json({
          status: 400,
          message: "Item is out of stock.",
          item: item.name,
        });
      }
      if (existingItem && isQuantityTooMuch()) {
        return res.status(400).json({
          status: 400,
          message:
            "Item quantity exceeds stock. Please try again with a lesser amount.",
          item: `${item.numInStock} of ${item.name} left in stock.`,
        });
      }

      // Increase quantity if item is in stock
      if (existingItem && isItemInStock) {
        await db
          .collection(CARTS_COLLECTION)
          .updateOne(
            { userId, "items.itemId": itemId },
            { $inc: { "items.$.quantity": quantity } }
          );
        return res.status(200).json({
          status: 200,
          message: "Item quantity updated successfully.",
        });
      } else {
        // Add new item to the cart
        await db.collection(CARTS_COLLECTION).updateOne(
          { userId },
          {
            $push: {
              items: {
                itemId,
                quantity,
                itemImageSrc,
                itemName,
                itemPrice,
              },
            },
          }
        );

        return res.status(200).json({
          status: 200,
          message: "Item added to cart successfully.",
        });
      }
    }

    // Removing an Item
    if (action === "remove") {
      // Check if the item exists in the cart
      const existingItem = cart.items.find((item) => item.itemId === itemId);

      if (existingItem) {
        // Decrease the quantity
        if (existingItem.quantity > quantity) {
          await db
            .collection(CARTS_COLLECTION)
            .updateOne(
              { userId, "items.itemId": itemId },
              { $inc: { "items.$.quantity": -quantity } }
            );
          return res.status(200).json({
            status: 200,
            message: "Item quantity decreased successfully.",
          });
        } else {
          // Remove the item if quantity drops to 0 or below
          await db
            .collection(CARTS_COLLECTION)
            .updateOne({ userId }, { $pull: { items: { itemId } } });
          return res.status(200).json({
            status: 200,
            message: "Item removed from cart successfully.",
          });
        }
      } else {
        return res.status(404).json({
          status: 404,
          message: "Item not found in the cart.",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  } finally {
    await client.close();
  }
};

module.exports = { cartHandler };

"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCategories = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("E-Commerce");
    const items = await db.collection("items").find().toArray();

    // Extract all categories
    const categories = items.flatMap((item) => item.category || []);

    // Get unique categories
    const uniqueCategories = [...new Set(categories)];

    res.status(200).json({ status: 200, categories: uniqueCategories });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res
      .status(500)
      .json({ status: 500, error: "Failed to retrieve categories" });
  } finally {
    await client.close();
  }
};

module.exports = { getCategories };

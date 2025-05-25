"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getBodyLocations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("E-Commerce");
    const items = await db.collection("items").find().toArray();

    // Extract all body locations
    const bodyLocations = items.flatMap((item) => item.body_location || []);

    // Get unique body locations
    const uniqueBodyLocations = [...new Set(bodyLocations)];

    res.status(200).json({ status: 200, body_locations: uniqueBodyLocations });
  } catch (error) {
    console.error("Error retrieving body locations:", error);
    res
      .status(500)
      .json({ status: 500, error: "Failed to retrieve body locations" });
  } finally {
    await client.close();
  }
};

module.exports = { getBodyLocations };

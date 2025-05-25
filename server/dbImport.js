"use strict";
require("dotenv").config();

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const companies = require("./data/companies.json");
const items = require("./data/items.json");

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    // Connecting to MongoDB
    await client.connect();
    const db = client.db("E-Commerce");
    console.log("Connected to MongoDB");

    // Inserting data to MongoDB
    const returnCompanies = await db
      .collection("companies")
      .insertMany(companies);
    const returnItems = await db.collection("items").insertMany(items);
    console.log("Data imported successfully");

    return returnCompanies, returnItems;

    // Catch and log errors
  } catch (error) {
    console.error("Error importing data:", error);
  } finally {
    // Clossing MongoDB
    await client.close();
    console.log("Disconnected from MongoDB");
  }
};

batchImport();

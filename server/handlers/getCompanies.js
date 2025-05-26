"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const DB = "E-Commerce";
const COMPANIES_COLLECTION = "companies";

const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB);

    // Fetch all information for each company
    const companies = await db
      .collection(COMPANIES_COLLECTION)
      .find({})
      .toArray();

    if (companies.length === 0) {
      res.status(404).json({
        status: 404,
        message: "404, No companies found.",
      });
    } else {
      res.status(200).json({
        status: 200,
        companies,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(502).json({
      status: 502,
      message: error.message,
    });
  } finally {
    await client.close();
  }
};

module.exports = {
  getCompanies,
};

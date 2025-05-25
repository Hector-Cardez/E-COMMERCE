"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const DB = "E-Commerce";
const COMPANIES_COLLECTION = "companies";

const getCompanyByName = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { name } = req.params;

  try {
    await client.connect();
    const db = client.db(DB);

    // Fetching with based on the name
    const company = await db.collection(COMPANIES_COLLECTION).findOne({ name });

    if (!company) {
      res.status(404).json({
        status: 404,
        message: `404, No company found with name: ${name}.`,
      });
    } else {
      res.status(200).json({
        status: 200,
        company,
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
  getCompanyByName,
};

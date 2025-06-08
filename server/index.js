"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Handlers
const { getCompanies } = require("./handlers/getCompanies");
const { getCompanyById } = require("./handlers/getCompanyById");
const { getCompanyByName } = require("./handlers/getCompanyByName");
const { getItemById } = require("./handlers/getItemById");
const { getItems } = require("./handlers/getItems");
const { getBodyLocations } = require("./handlers/getBodyLocations");
const { getCategories } = require("./handlers/getCategories");
const { createOrder } = require("./handlers/createOrder");
const { cartHandler } = require("./handlers/cartHandler");
const { deleteOrder } = require("./handlers/deleteOrder");
const { getCart } = require("./handlers/getCart");
const { getNumberInStock } = require("./handlers/getNumberInStock");

const PORT = 4000;

const app = express();
app
  .use(cors())

  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  /////////// REST endpoints:////////////

  // Companies
  .get("/companies", getCompanies)
  .get("/companies/id/:id", getCompanyById)
  .get("/companies/name/:name", getCompanyByName)

  // Items
  .get("/items", getItems)
  .get("/items/id/:id", getItemById)
  .get("/items/id/:id/stock", getNumberInStock)

  // Body Locations
  .get("/body-locations", getBodyLocations)

  // Categories
  .get("/categories", getCategories)

  // Submit order
  .post("/order", createOrder)

  // Cart
  .post("/cart", cartHandler) // <-- only POST, handles add & remove via action in body
  // Removed .put("/cart/manage", cartHandler) to avoid 405 error

  // Delete order
  .delete("/delete-order/:order", deleteOrder)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

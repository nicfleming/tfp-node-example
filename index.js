/**
 * @file index.js
 */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const database = require("./database");
const initFellows = require("./fellows");
const { logEndpointHits } = require('./errors');

const port = 3000;
const app = express();

// Enable body parsing middleware
app.use(bodyParser.json());

// Log every hit to an endpoint
app.use(logEndpointHits);

// Security
app.use(helmet());

// CORS
app.use(cors());

// Format JSON output for dev
if (process.env.NODE_ENV !== "production") {
  app.set("json spaces", 2);
}

// Listen to traffic
app.listen(port, () => console.log("Boosh!"));

// Create connection to Mongo
database.initMongoConnection();

// Attach fellows endpoints
initFellows(app);

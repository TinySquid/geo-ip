require("dotenv").config();

// Express setup
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// Custom middleware
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const axios = require("axios");

const app = express();

const port = process.env.PORT || 5000;

// Log requests in dev
if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(helmet());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "running" });
});

// 404 routing
app.use(notFound);

// Final error catching
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

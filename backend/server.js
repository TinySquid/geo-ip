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

//* / Responds with server status
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    status: "running",
  });
});

//* /ip Responds with requester IP
app.get("/ip", (req, res) => {
  res.status(200).json({
    success: true,
    req: req.header("x-forwarded-for") || req.connection.remoteAddress,
  });
});

//* /location Responds with ip location data parsed for the frontend to use
//* Host query param must be -> ?host=8.8.8.8 or ?host=www.domain.com
app.get("/location", async (req, res) => {
  const { host } = req.query;

  if (host) {
    try {
      // Acting as a go-between from our frontend to the actual API. This way our api-key is protected
      const response = await axios.get(
        `${process.env.IP_LOCATION_ENDPOINT}?apiKey=${process.env.IPGEO_API_KEY}&ip=${host}`
      );

      // Extract data
      const { data } = response;

      if (data) {
        // Parse data for frontend
        res.status(200).json({
          success: true,
          ip: data.ip,
          location: `${data.city}, ${data.state_prov} ${data.zipcode}`,
          timezone: `UTC ${data.time_zone.offset}`,
          isp: data.isp,
          latlon: [data.latitude, data.longitude],
          timestamp: new Date().setHours(0, 0, 0, 0),
        });
      } else {
        // Third-party API responded with an error
        throw new Error("API Error");
      }
    } catch (error) {
      // See errorHandler middleware for reasoning behind response code
      res.status(404).json({ success: false });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Must provide host query parameter",
    });
  }
});

//* 404 route handling
app.use(notFound);

//* Last error catcher before crashing node
app.use(errorHandler);

module.exports = app;

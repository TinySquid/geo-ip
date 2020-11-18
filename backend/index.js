require("dotenv").config();

const express = require("express");

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({ status: "running" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

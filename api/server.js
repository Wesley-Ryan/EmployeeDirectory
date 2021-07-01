const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`We are up and running`);
});

module.exports = app;

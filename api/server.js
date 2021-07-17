const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./accounts/authenticationRouter.js");
const employeeRouter = require("./routes/employeeRouter.js");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());
app.use(express.json());

//routes
app.use("/accounts", authRouter);
app.use("/company", employeeRouter);

app.get("/", (req, res) => {
  res.send(`We are up and running`);
});

module.exports = app;

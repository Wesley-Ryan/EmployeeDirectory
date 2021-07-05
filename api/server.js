const express = require("express");
const helmet = require("helmet");
//const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./accounts/authenticationRouter.js");
const employeeRouter = require("./routes/employeeRouter.js");

const whitelist = ["http://localhost:8080", "http://example.com"];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};
const app = express();

app.use(helmet());
app.use(cors(corsOptions));
//app.use(morgan("common"));
app.use(cookieParser());
app.use(express.json());

//routes
app.use("/accounts", authRouter);
app.use("/company", employeeRouter);

app.get("/", (req, res) => {
  res.send(`We are up and running`);
});

module.exports = app;

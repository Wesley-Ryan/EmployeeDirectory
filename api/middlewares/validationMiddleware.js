const jwt = require("jsonwebtoken");

const Helper = require("../models/userModel.js");
const SessionHelper = require("../models/sessionModel.js");

async function validateLoginPayload(req, res, next) {
  try {
    const user = req.body;
    const [validUser] = await Helper.findUserByEmail(user.email);
    if (!validUser) {
      res.status(401).json({
        message: "User does not exist, please ensure email is correct.",
      });
    } else if (!user.email || !user.password) {
      res.status(401).json("username and password required to login.");
    } else {
      req.User = user;
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "User does not exist", error_msg: error.message });
  }
}

function validateRegisterBody(req, res, next) {
  const user = req.body;
  if (!user.email || !user.password || !user.first_name || !user.last_name) {
    res
      .status(500)
      .json("Missing Fields, please ensure all fields are completed.");
  } else {
    req.User = user;
    next();
  }
}

async function validateUsernameUnique(req, res, next) {
  try {
    const exsistingUser = await Helper.findUserByEmail(req.body.email);
    if (!exsistingUser.length) {
      next();
    } else {
      res
        .status(400)
        .json("Username is taken, please choose a unique username.");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const validator = async (req, res, next) => {
  try {
    const token = req.cookies.MNTN_Corp;
    if (!token) {
      res.status(401).json("Token required, you must be logged in.");
    } else {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const [activeSession] = await SessionHelper.findSessionByID(decoded.id);
      if (activeSession) {
        req.Decoded = decoded;
        req.UserId = decoded.id;
        next();
      } else {
        res.status(401).json("Token required, you must be logged in.");
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error validating access", error_msg: error.message });
  }
};

async function validateManager(req, res, next) {
  try {
    const { role } = req.Decoded;
    //compare role to pg roles table
    const [authorizedRole] = await Helper.findRole(role);
    console.log(authorizedRole.name);
    if (authorizedRole.name != "Manager") {
      res.status(401).json({
        message: "Unauthorized access. Please contact your account manager.",
      });
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error validating access", error_msg: error.message });
  }
}

module.exports = {
  validateRegisterBody,
  validateLoginPayload,
  validateUsernameUnique,
  validator,
  validateManager,
};

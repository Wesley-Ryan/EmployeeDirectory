const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Helper = require("../models/userModel.js");
const SessionHelper = require("../models/sessionModel.js");

const { createBerry, sendHelp } = require("../auth/accountRescue.js");

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
  const token = req.headers.authorization;
  try {
    if (!token) {
      res.status(401).json("Token required, you must be logged in.");
    } else {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const [activeSession] = await SessionHelper.findSessionByID(decoded.id);
      const [user] = await Helper.findUserByID(activeSession.user_id);
      if (activeSession && user.active) {
        req.Decoded = decoded;
        req.UserId = decoded.id;
        next();
      } else {
        res
          .status(401)
          .json(
            "Token required, you must be logged in with an active account."
          );
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error validating access", error_msg: error.message });
  }
};

async function validateActiveAccount(req, res, next) {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error validating access", error_msg: error.message });
  }
}

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

async function validateUserRecovery(req, res, next) {
  const { email } = req.body;
  try {
    //find user by email
    const [user] = await Helper.findUserByEmail(email);

    if (!user) {
      res.status(400).json({
        message:
          "We were unable to locate the requested user, please contact support. *INVALID ACCOUNT REQUEST* ",
      });
    } else {
      const berry = createBerry();
      const changes = { ...user, pinpoint: berry };
      const savior = {
        user: user.email,
        first_name: user.first_name,
        verification: berry,
      };
      await Helper.updateUser(user.id, changes);
      req.User = changes;
      sendHelp(savior.user, savior.first_name, savior.verification);
      next();
    }
  } catch (error) {
    res.status(500).json({
      message:
        "There was an issue retrieving your account details, please contact support.",
      err_message: error.message,
    });
  }
}

async function validatePasswordReset(req, res, next) {
  const { genSalt, hash } = bcrypt;
  const salt = await genSalt(11);

  const berry = req.body.pinpoint;
  const resetChange = req.body.password;

  try {
    const [user] = await Helper.findUserSavior(berry);
    if (!user) {
      res
        .status(400)
        .json({ message: "Invalid verification code. Please try again." });
    } else {
      const hashedPassword = await hash(resetChange, salt);
      const changes = { ...user, password: hashedPassword };
      const [updated] = await Helper.updateUser(user.id, changes);
      req.User = updated;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  validateRegisterBody,
  validateLoginPayload,
  validateUsernameUnique,
  validator,
  validateManager,
  validateUserRecovery,
  validatePasswordReset,
};

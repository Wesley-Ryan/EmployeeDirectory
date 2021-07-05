const express = require("express");
const registerUser = require("../auth/registerUser.js");
const authorizeUser = require("../auth/authorizeUser.js");
const loginUser = require("../auth/loginUser.js");

const {
  validateRegisterBody,
  validateUsernameUnique,
  validateLoginPayload,
  validator,
  validateUserRecovery,
  validatePasswordReset,
} = require("../middlewares/validationMiddleware.js");

const SessionHelper = require("../models/sessionModel.js");

const router = express.Router();

router.post(
  "/signup",
  validateRegisterBody,
  validateUsernameUnique,
  async (req, res) => {
    try {
      const result = await registerUser(req.User);
      console.log("RESULT", result);
      res.status(201).json({ message: result });
    } catch (error) {
      res.status(500).json({
        message: "Server Error in Post Route",
        error_message: error.message,
      });
    }
  }
);

router.post("/login", validateLoginPayload, async (req, res) => {
  try {
    const { isAuthorized, currentUser, message } = await authorizeUser(
      req.User
    );
    if (isAuthorized) {
      console.log("Golden,", message);
      const returned = await loginUser(currentUser, req, res);
      res
        .status(200)
        .json({ message: message, data: { token: returned, id: req.User.id } });
    } else {
      console.log("Not Golden,", message);
      res.status(401).json({ message: message });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error on Server, login failed.",
      error_message: error.message,
    });
  }
});

router.post("/logout", validator, async (req, res) => {
  const id = req.UserId;
  try {
    await SessionHelper.removeSession(id);
    res.status(201).json({ message: "Good Bye" });
  } catch (error) {
    res.status(500).json({
      message: "Error on Server, session deletion failed.",
      error_message: error.message,
    });
  }
});

//create and send password reset code.
router.post("/account/send/help", validateUserRecovery, (req, res) => {
  res
    .status(200)
    .json({ message: "Success, please check your email account." });
});

//verify code and reset pw
router.post(
  "/account/recovery/challenge",
  validatePasswordReset,
  (req, res) => {
    const user = req.User;
    res.status(200).json({ message: "Password reset success, please login." });
  }
);

module.exports = router;

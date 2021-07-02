const express = require("express");
const registerUser = require("../auth/registerUser.js");
const authorizeUser = require("../auth/authorizeUser.js");

const {
  validateRegisterBody,
  validateUsernameUnique,
  validateLoginPayload,
} = require("../middlewares/validationMiddleware.js");

const router = express.Router();

router.post(
  "/signup",
  validateRegisterBody,
  validateUsernameUnique,
  async (req, res) => {
    try {
      let userType = "";
      req.User.role ? (userType = req.User.role) : (userType = "Team Member");
      const result = await registerUser(req.User, userType);
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
      console.log("Golden", message);
    } else {
      console.log("Not Golden", message);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error on Server, login failed.",
      error_message: error.message,
    });
  }
});

module.exports = router;

const express = require("express");

const router = express.Router();

router.post(
  "/signup",

  async (req, res) => {
    try {
      let userType = "";
      req.User.role ? (userType = req.User.role) : (userType = "Team Member");
      const result = await registerUser(req.User, userType);
      res.status(201).json({ message: result });
    } catch (error) {
      res.status(500).json({
        message: "Server Error in Post Route",
        error_message: error.message,
      });
    }
  }
);

module.exports = router;

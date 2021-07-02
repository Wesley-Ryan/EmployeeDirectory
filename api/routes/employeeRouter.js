const express = require("express");
const { validator } = require("../middlewares/validationMiddleware.js");
const UserHelper = require("../models/userModel.js");

const router = express.Router();

router.get("/employees", validator, async (req, res) => {
  try {
    const employees = await UserHelper.getAllUsers();
    const success = employees.map((employee) => {
      return { ...employee, password: "" };
    });
    res.status(200).json({ message: "Success", data: success });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error_message: error.message });
  }
});

module.exports = router;

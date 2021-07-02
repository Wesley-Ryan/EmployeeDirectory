const express = require("express");
const {
  validator,
  validateManager,
} = require("../middlewares/validationMiddleware.js");
const UserHelper = require("../models/userModel.js");

const router = express.Router();

//get all employees should be only manager
router.get(
  "/employees/:department",
  validator,
  validateManager,
  async (req, res) => {
    try {
      const { department } = req.params;
      const [requestingUser] = await UserHelper.findUserByID(req.UserId);
      if (requestingUser.department != department) {
        res.status(401).json({
          message:
            "You must be the department manager to view these employees. Contact support for more information.",
        });
      } else {
        const employees = await UserHelper.getAllUsers();
        res.status(200).json({ message: "Success", data: employees });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Server Error", error_message: error.message });
    }
  }
);

module.exports = router;

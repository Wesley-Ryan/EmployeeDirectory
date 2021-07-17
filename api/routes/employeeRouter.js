const express = require("express");
const {
  validator,
  validateManager,
} = require("../middlewares/validationMiddleware.js");
const UserHelper = require("../models/userModel.js");

const router = express.Router();

//get all employees of department if you are the manager of department (sensitive Info)
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
        const employees = await UserHelper.getAllUsersByDepartment(department);
        res.status(200).json({ message: "Success", data: employees });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Server Error", error_message: error.message });
    }
  }
);
//get all by department (general info)
router.get("/employees/general/:department", validator, async (req, res) => {
  try {
    const { department } = req.params;

    const employees = await UserHelper.getAllUsersByDepartmentGeneralInfo(
      department
    );
    res.status(200).json({ message: "Success", data: employees });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error_message: error.message });
  }
});
//get all accounts General Info
router.get("/employees/general/all", validator, async (req, res) => {
  try {
    const employees = await UserHelper.getAllUsersGeneralInfo();
    res
      .status(200)
      .json({ message: "Success with employees", data: employees });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error_message: error.message });
  }
});
//get all accounts (sensitive info) ADMIN ONLY
router.get("/admin/employees/all", validator, async (req, res) => {
  const { role } = req.Decoded;

  try {
    if (role === 1328) {
      const employees = await UserHelper.getAllUsers();
      res.status(200).json({ message: "Success", data: employees });
    } else {
      res.status(401).json({
        message:
          "You do not have access to this area. Please contact support. ",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error_message: error.message });
  }
});

//get currentUser
router.get("/account/current", validator, async (req, res) => {
  const { id } = req.Decoded;

  try {
    const [user] = await UserHelper.findUserByID(id);
    const currentUser = { ...user, password: null };
    res.status(200).json({ message: "Success", user: currentUser });
  } catch (error) {
    res.status(500).json({
      message: "Error on Server, unable to locate account.",
      error_message: error.message,
    });
  }
});

//get 1 account

router.get("/account/:userId", validator, async (req, res) => {
  const { userId } = req.params;
  const userAccount = parseInt(userId);
  const { role, id } = req.Decoded;

  try {
    const [user] = await UserHelper.findUserByID(userAccount);
    const [roleName] = await UserHelper.findRole(user.role);
    if (!user) {
      res.status(400).json({
        message: "Requested User does not exist.",
      });
    } else if (id === userAccount || role < 3893) {
      const success = { ...user, password: null, role_name: roleName.name };
      res.status(200).json({ message: "Success", data: success });
    } else {
      res.status(401).json({
        message: "You do not have permission to access this account.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error on Server, unable to locate account.",
      error_message: error.message,
    });
  }
});

//account update
router.put("/account/:userId", validator, async (req, res) => {
  const { userId } = req.params;
  const userAccount = parseInt(userId);
  const { role, id } = req.Decoded;
  const changes = req.body;

  try {
    const [user] = await UserHelper.findUserByID(userId);
    const [roleName] = await UserHelper.findRole(user.role);
    if (!user) {
      res.status(400).json({
        message:
          "Requested User does not exist, please be sure the email is correct.",
      });
    } else if (id === userAccount || role === 1328) {
      const [updatedUser] = await UserHelper.updateUser(userId, changes);
      if (updatedUser.title?.length > 2 && updatedUser.salary?.length > 2) {
        const success = {
          ...updatedUser,
          password: null,
          role_name: roleName.name,
          profile: 100,
        };
        res
          .status(201)
          .json({ message: "Account updated successfully.", data: success });
      } else {
        const success = {
          ...updatedUser,
          password: null,
          role_name: roleName.name,
        };
        res
          .status(201)
          .json({ message: "Account updated successfully.", data: success });
      }
    } else {
      res.status(401).json({
        message: "You do not have permission to edit this account.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Error on Server, changes not accepted please contact support with error message.",
      error_message: error.message,
    });
  }
});

module.exports = router;

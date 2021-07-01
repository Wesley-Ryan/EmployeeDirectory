const bcrypt = require("bcryptjs");
const UserHelper = require("../models/userModel.js");
const buildUser = require("../auth/registerUserType.js");

const { generateSalt, hash } = bcrypt;

async function registerUser(user, type) {
  try {
    const salt = await generateSalt(11);
    const hashedPassword = await hash(user.password, salt);
    const newUser = await buildUser(user, type, hashedPassword);
    const success = await UserHelper.createUser(newUser);
    console.log("check my user in registerUser function", newUser);
    return success;
  } catch (error) {
    throw new Error({
      message: "Registration Failed",
    });
  }
}

module.exports = registerUser;

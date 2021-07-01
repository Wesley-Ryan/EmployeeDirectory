const bcrypt = require("bcrypt");

const UserHelper = require("../models/userModel.js");
const buildUser = require("../auth/registerUserType.js");

const { genSalt, hash } = bcrypt;
async function registerUser(user, type) {
  try {
    const salt = await genSalt(11);
    const hashedPassword = await hash(user.password, salt);
    const newUser = await buildUser(user, type, hashedPassword);
    const success = await UserHelper.createUser(newUser);

    return success;
  } catch (error) {
    throw new Error({
      message: "Registration Failed",
    });
  }
}

module.exports = registerUser;

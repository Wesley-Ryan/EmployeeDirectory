const bcrypt = require("bcrypt");
const userHelper = require("../models/userModel.js");

const { compare } = bcrypt;

const authorizeUser = async ({ email, password }) => {
  try {
    const [user] = await userHelper.findUserByEmail(email);
    let isAuthorized = await compare(password, user.password);
    const [currentUser] = await userHelper.updateUser(user.id, {
      ...user,
      login_attempts: 0,
    });
    let message = `Welcome ${currentUser.first_name}`;
    //bool
    if (!isAuthorized) {
      const attempts = (user.login_attempts += 1);
      let chances = 3 - attempts;
      message = `Incorrect Username and Password ${
        chances === 1 ? "1 chance" : `${chances} chances`
      } remaining.`;

      if (attempts >= 3) {
        message = "Account Locked, contact account manager.";
        //lock account account active becomes false.
        userHelper.updateUser(user.id, { ...user, active: false });
        //send email to admin/manager once we setup Email.
        return { isAuthorized, currentUser, message };
      } else {
        const changes = { ...user, login_attempts: attempts };
        await userHelper.updateUser(user.id, changes);
      }
    }
    return { isAuthorized, currentUser, message };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = authorizeUser;

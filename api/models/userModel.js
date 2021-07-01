const db = require("../../data/db-config");

module.exports = {
  getAllUsers() {
    return db("users");
  },
  findUserByEmail(email) {
    return db("users").where("email", email);
  },

  findUserByID(id) {
    return db("users").where("id", id);
  },

  async createUser(user) {
    try {
      await db("users").insert(user);
      return "User Created";
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateUser(id, changes) {
    try {
      await db("users").where("id", id).update(changes);
      return db("users").where("id", id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

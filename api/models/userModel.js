const db = require("../../data/db-config");

module.exports = {
  async getAllUsers() {
    const all = await db("users");
    return all.map((each) => ({ ...each, password: "" }));
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

  findRole(role) {
    return db("roles").where("name", role);
  },
};

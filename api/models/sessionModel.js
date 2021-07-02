const db = require("../../data/db-config");

module.exports = {
  getAllSessions() {
    return db("sessions");
  },

  getAllExpired(now) {
    return db("sessions").where("expires", "<", now);
  },

  findSessionByID(uid) {
    return db("sessions").where("user_id", uid);
  },

  async createSession(session) {
    try {
      await db("sessions").insert(session);
      return "session created";
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async removeSession(uid) {
    try {
      await this.findSessionByID(uid).delete();
      return "session ended";
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const { randomBytes } = require("crypto");
const sessionHelper = require("../models/sessionModel.js");

async function checkActiveSession(userId) {
  try {
    const [activeSession] = await sessionHelper.findSessionByID(userId);
    if (activeSession) {
      await sessionHelper.removeSession(activeSession.user_id);
    }
  } catch (error) {
    throw new Error("Unable to create Session. Session creation failed.");
  }
}

const createSession = async (userId, connection) => {
  try {
    await checkActiveSession(userId);

    const sessionToken = randomBytes(12).toString("hex");
    const { ip, userAgent } = connection;
    const now = new Date();
    const expiresIn = now.setHours(now.getHours() + 6);

    const newSession = {
      id: sessionToken,
      user_id: userId,
      valid: true,
      user_agent: userAgent,
      ip: ip,
      created_at: new Date(),
      expires: Math.round(expiresIn / (1000 * 60 * 60)),
    };
    await sessionHelper.createSession(newSession);

    return newSession;
  } catch (error) {
    throw new Error("Unable to create Session, Session creation failed .");
  }
};

module.exports = createSession;

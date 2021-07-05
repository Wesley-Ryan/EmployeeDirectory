const cookieConfig = require("./cookieConfig.js");
const createSession = require("./createSession.js");
const generateToken = require("../auth/createToken.js");

async function loginUser(user, req, res) {
  const connectionInfo = {
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  };
  await createSession(user.id, connectionInfo);
  const accessToken = generateToken(user);
  res.cookie(`MNTN_Corp`, accessToken, cookieConfig);
  return accessToken;
}

module.exports = loginUser;

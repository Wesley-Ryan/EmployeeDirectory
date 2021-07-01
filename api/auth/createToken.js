const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const options = {
    expiresIn: "4hr",
  };
  return jwt.sign(payload, process.env.SECRET, options);
}

function generateRefreshToken(token) {
  const payload = {
    id: token,
  };
  const options = {
    expiresIn: "4hr",
  };
  return jwt.sign(payload, process.env.SECRET, options);
}

module.exports = generateToken;

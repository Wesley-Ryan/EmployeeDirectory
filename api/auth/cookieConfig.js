const cookieConfig = {
  maxAge: 60 * 1000 * 240,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
};

module.exports = cookieConfig;

require("dotenv").config();
const app = require("./api/server.js");

const PORT = process.env.PORT || 3990;
app.listen(PORT, () => {
  console.log(`go brrrrp on:${PORT}`);
});

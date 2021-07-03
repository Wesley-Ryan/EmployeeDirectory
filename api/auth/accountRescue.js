const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_INFO);

function sendHelp(userInNeed, userName, berry) {
  const msg = {
    to: userInNeed,
    from: process.env.EMAIL_SENDER,
    subject: "Copy that...Team MNTN Over...",
    text: "Verification",
    templateId: process.env.EMAIL_TEMPLATE,
    dynamic_template_data: {
      firstName: userName,
      unique_key: berry,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error.response.body);
    });
}

function createBerry() {
  const berry = Math.random().toString(36).slice(7);
  return berry;
}

module.exports = {
  sendHelp,
  createBerry,
};

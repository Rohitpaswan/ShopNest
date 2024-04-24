const nodemailer = require("nodemailer");
const { smptUsername, smptPassword } = require("../secret");

const transporter = nodemailer.createTransport({
  service: "gmail",
 // Use `true` for port 465, `false` for all other ports
  auth: {
    user: smptUsername,
    pass: smptPassword,
  },
});

const sendEmailWithNodemailer = async (emailData) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail(emailData);
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending email", err);
    // errorResponse({statusCode: 500, message: err} );
  }
};

module.exports = sendEmailWithNodemailer;

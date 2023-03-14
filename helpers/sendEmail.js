const nodemailer = require("nodemailer");

require("dotenv").config();

const { META_PASSWORD } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "sdm17@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
  const emailOptions = {
    ...data,
    from: "sdm17@meta.ua",
  };

  await transporter.sendMail(emailOptions);
  return true;
};

module.exports = sendEmail;

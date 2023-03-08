// const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const uniqid = require("uniqid");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      res.status(409).json({
        status: "Error",
        code: 409,
        message: "Email in use",
      });
      return;
      // throw new Conflict("Email in use");
    }

    const avatarUrl = gravatar.url(email);

    const verificationToken = uniqid();

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({
      email,
      password: hashPassword,
      avatarUrl,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Verify email",
      html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click to verify your email<a/>`,
    };

    sendEmail(mail);

    res.status(201).json({
      status: "Success",
      code: 201,
      data: {
        user: {
          email: result.email,
          subscription: result.subscription,
          avatarUrl: result.avatarUrl,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;

// const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models");

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

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({
      email,
      password: hashPassword,
      avatarUrl,
    });

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

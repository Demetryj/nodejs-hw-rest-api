// const { NotFound, BadRequest } = require("http-errors");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        status: "Error",
        code: 404,
        message: "User not found",
      });
      return;
      // throw new NotFound("User not found");
    }

    if (user.verify) {
      res.status(400).json({
        status: "Error",
        code: 400,
        message: "Verification has already been passed",
      });
      return;
      // throw new BadRequest("User not found");
    }

    const mail = {
      to: email,
      subject: "Verify email",
      html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click to verify your email<a/>`,
    };

    sendEmail(mail);

    res.json({
      status: "Success",
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;

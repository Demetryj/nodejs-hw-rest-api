// const { NotFound } = require("http-errors");
const { User } = require("../../models");

const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      res.status(404).json({
        status: "Error",
        code: 404,
        message: "User not found",
      });
      return;
      // throw new NotFound("User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });

    res.json({
      status: "Success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;

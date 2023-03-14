const register = require("./register");
const verify = require("./verify");
const resendEmail = require("./resendEmail");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const changeSubscription = require("./changeSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  register,
  verify,
  resendEmail,
  login,
  getCurrent,
  logout,
  changeSubscription,
  updateAvatar,
};

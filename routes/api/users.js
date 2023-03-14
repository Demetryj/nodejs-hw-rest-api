const express = require("express");
const { usersControllers } = require("../../controllers");
const { auth, upload, usersValidation } = require("../../middlewares/users");
const {
  authUserJoiSchema,
  verifyEmailJoiSchema,
  loginUserJoiSchema,
  changeSubscriptionUserJoiSchema,
} = require("../../models/users");

const router = express.Router();

const validationUserAuth =
  usersValidation.userAuthValidation(authUserJoiSchema);

const validationVerifyEmail =
  usersValidation.userAuthValidation(verifyEmailJoiSchema);

const validationUserLogin =
  usersValidation.userAuthValidation(loginUserJoiSchema);

const validationChangeSubscriptionUser = usersValidation.userAuthValidation(
  changeSubscriptionUserJoiSchema
);

router.post("/register", validationUserAuth, usersControllers.register);

router.get("/verify/:verificationToken", usersControllers.verify);

router.post("/verify", validationVerifyEmail, usersControllers.resendEmail);

router.post("/login", validationUserLogin, usersControllers.login);

router.get("/current", auth, usersControllers.getCurrent);

router.post("/logout", auth, usersControllers.logout);

router.patch(
  "/",
  auth,
  validationChangeSubscriptionUser,
  usersControllers.changeSubscription
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  usersControllers.updateAvatar
);

module.exports = router;

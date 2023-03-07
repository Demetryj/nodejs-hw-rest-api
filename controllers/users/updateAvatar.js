const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models");

const pathAvatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const extention = originalname.split(".").pop();
  const imageName = `${_id}.${extention}`;

  //   const imageName = `${_id}_${originalname}`;

  const resultUpload = path.join(pathAvatarsDir, imageName);
  await fs.rename(tempUpload, resultUpload);

  await Jimp.read(resultUpload)
    .then((image) =>
      image.resize(250, 250).quality(60).greyscale().write(resultUpload)
    )
    .catch((err) => {
      console.error(err);
    });

  const avatarUrl = path.join("avatars", imageName);

  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({
    status: "Success",
    code: 200,
    avatarUrl,
  });
};

module.exports = updateAvatar;

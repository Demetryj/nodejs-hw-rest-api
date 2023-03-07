const multer = require("multer");
const path = require("path");

const pathTempDir = path.join(__dirname, "../../", "temp");

const multerConfig = multer.diskStorage({
  destination: pathTempDir,

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },

  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;

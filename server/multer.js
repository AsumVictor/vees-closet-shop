const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cd(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "_" + Math.round.apply(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + uniqueSuffix + ".png");
  },
});

module.exports = multer({ storage });

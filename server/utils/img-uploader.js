const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {

    cb(null, path.resolve(process.cwd() + "/" + process.env.UPLOAD_DIR + "/img"));
  },
  filename: function(req, file, cb) {

    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({storage: imageStorage, fileFilter: fileFilter});

module.exports = upload;
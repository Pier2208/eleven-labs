const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = {
  uploadSingle: function () {
    return upload.single('image');
  }
};

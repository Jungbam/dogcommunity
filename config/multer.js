const logger = require('./winston');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

//////////////////////////////////////////////////
///////// AWS S3에 업로드하면 변경 예정 //////////
//////////////////////////////////////////////////

try {
  fs.readdirSync('uploads');
} catch {
  logger.warn('uploads 폴더가 없습니다!');
  fs.mkdirSync('uploads');
  logger.info('uploads 폴더를 생성했습니다.');
}
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    const ext = path.extname(file.originalname);
    callback(null, `${Date.now()}${ext}`);
  },
});
const limits = { fileSize: 5 * 1024 * 1024, files: 5 };

const upload = multer({ storage, limits });

module.exports = upload;

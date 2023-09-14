const multer = require('multer');

const companyEditUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileName = file.originalname.replace(/\s+/g, '');
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + fileName);
    }
  })
}).fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'coverPicture', maxCount: 1 },
]);

module.exports = companyEditUpload;
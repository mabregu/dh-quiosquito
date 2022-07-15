const multer = require('multer');
const path = require('path');
const maxFileSize = 10000000;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/uploads'));
    },
    filename: (req, file, cb) => {
        let name = Date.now() + path.extname(file.originalname);
        cb(null, name);
    },
    limits: {
        fileSize: maxFileSize
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

const upload = multer({ storage });

module.exports = upload;
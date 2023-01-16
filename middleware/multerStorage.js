import multer from "multer";
import path from "path";
const __dirname = path.resolve();

//https://github.com/gitoutofbox/nodejs-file-upload

export const diskStorage = (folder) =>
  multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname, `/public/images/${folder}`));
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

export const configMulter = {
  filesize: 1 * 1024 * 1024,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        req.multer.error = 'Only .png, .jpg and .jpeg format allowed!';
    }
  }
};



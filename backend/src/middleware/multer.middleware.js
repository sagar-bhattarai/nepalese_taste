import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.fieldname + path.extname(file.originalname));
  }
})

export const upload = multer({ storage: storage });


/*

      import multer from "multer";
      import fs from "fs";
      import path from "path";

      const uploadDir = path.join(process.cwd(), "public", "temp");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const storage = multer.diskStorage({
        destination(req, file, cb) {
          cb(null, uploadDir);
        },
        filename(req, file, cb) {
          cb(null, file.fieldname + path.extname(file.originalname));
        }
      });

      export const upload = multer({ storage });

        
*/

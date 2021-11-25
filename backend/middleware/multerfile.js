const multer = require("multer")

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
  'application/pdf': 'pdf'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
      if(isValid == 'pdf'){
        store = "backend/document";
      } else {
        store = "backend/images";
      }
    }
    cb(error, store)
  },
  filename: (req, file, cb) => {
    file.originalname = Date.now()+"_"+ file.originalname.toLowerCase().split(' ').join('_');
    cb(null, file.originalname);
  }
});

module.exports = multer({ storage: storage }).array("file");
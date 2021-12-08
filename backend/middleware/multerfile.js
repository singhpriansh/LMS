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
      file.originalname = Date.now()+"_"+ file.originalname.toLowerCase().split(' ').join('_');
      error = null;
      if(isValid == 'pdf'){
        req.body.certname = file.originalname;
        store = "backend/document";
      } else {
        req.body.picname = file.originalname;
        store = "backend/images";
      }
    }
    cb(error, store)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

module.exports = multer({ storage: storage }).array("file");
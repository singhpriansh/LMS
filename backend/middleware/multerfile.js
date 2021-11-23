const multer = require("multer")

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
  'application/pdf': 'pdf'
};

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    console.log(req);
    const isValid = MIME_TYPE_MAP[req.body.imageBuffer.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
      if(isValid == 'pdf'){
        store = "backend/document";
      }else{
        store = "backend/images"
      }
    }
    cb(error, store)
  },
  filename: (req, res, cb) => {
    const name = req.body.pic.toLowerCase().split(' ').join('_');
    const ext = MIME_TYPE_MAP[req.body.imageBuffer.mimetype];
    cb(null,name + '-' + Date.now() + '.' + ext);
  }
});

module.exports = multer({ storage: storage }).single("file");
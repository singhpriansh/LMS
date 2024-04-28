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
    let store = "backend/drive/" + req.userData.id;
    file.originalname = file.originalname
      .split(`%22`).join(`"`)
      .split(' ').join('/')
    let detail = JSON.parse(file.originalname)
    if(detail.path == undefined){
      const isValid = MIME_TYPE_MAP[file.mimetype];
      if(isValid == 'pdf'){
        store = store + "/root/documents";
      } else {
        store = store + "/root/images";
      }
    } else {
      store = store + "/root" + detail.path;
    }
    console.log(store)
    cb(null, store)
  },
  filename: (req, file, cb) => {
    detail = JSON.parse(file.originalname)
    cb(null, detail.name);
  }
});

module.exports = multer({ storage: storage }).array("file");
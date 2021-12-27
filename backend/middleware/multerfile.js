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
    console.log(req.body);
    if(req.body.loc == undefined){
      const isValid = MIME_TYPE_MAP[file.mimetype];
      if(isValid == 'pdf'){
        store = store + "/root/documents";
      } else {
        store = store + "/root/images";
      }
    } else {
      if(req.body.loc == 'Drive'){
        store = store + "/root" + req.body.path;
      }else if(req.body.loc == 'Trash'){
        store = store + "/trash" + req.body.path;
      }else{
        store = store + "/shared" + req.body.path;
      }
    }
    console.log(store)
    cb(null, store)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

module.exports = multer({ storage: storage }).array("file");
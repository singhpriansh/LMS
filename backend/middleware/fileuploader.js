const fs = require("fs");

const drive = "backend/drive/";

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
  'application/pdf': 'pdf'
};

module.exports = (req,res,next) => {
  const path = drive + req.userData.id + "/root";
  req.body.data.forEach(object => {
    // fs.readFile(object.data, (err, data) => {
      let loc = path + object.path + object.name;
      console.log(loc);
      fs.writeFile(loc, object.data, (err) => {
        if (err) {
          console.log("Error uploading file:",err)
        }else{
          console.log("File Uploaded");
        }
      });
    // });
  });
  return res.status(201)
    .json({
      message:"File uploaded"
    })
}
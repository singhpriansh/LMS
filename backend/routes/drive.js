const express = require("express");
const router = express.Router();

const auth_check = require("../middleware/auth_check");
const drive = require("../controllers/filehandling");
const multer = require("../middleware/multerfile");

router.get("",(req,res,next) => {
  console.log("came here also");
});

router.post("",auth_check,drive.Viewfolder);

router.post("/upload",auth_check,multer,
  (req,res) => {
    return res.status(201)
    .json({
      message:"File uploaded"
    })
  }
);

module.exports = router;
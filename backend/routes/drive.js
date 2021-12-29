const express = require("express");
const router = express.Router();

const auth_check = require("../middleware/auth_check");
const drive = require("../controllers/filehandling");
const dl = require ("../controllers/filedownloader");
const multer = require("../middleware/multerfile");

router.get("",(req,res,next) => {
  res.send("storage")
});

router.post("",auth_check,drive.Viewfolder);

router.post("/download",auth_check,dl.Download);

// router.post("/rename",auth_check,drive.Rename);

router.put("/upload",auth_check,multer,(req,res) => {
  return res.status(201).json({
    message:"File uploaded"
  })
});

module.exports = router;
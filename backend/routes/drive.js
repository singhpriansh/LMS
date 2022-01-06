const express = require("express");
const router = express.Router();

const auth_check = require("../middleware/auth_check");
const drive = require("../controllers/serverstore/filehandling");
const dl = require ("../controllers/serverstore/filedownloader");
const multer = require("../middleware/multerfile");

router.get("",(req,res) => {
  return res.send("storage")
});

router.post("",auth_check,drive.Viewfolder);

router.post("/download",auth_check,dl.Download);

router.post("/move",auth_check,drive.Move);

router.post("/copy",auth_check,drive.Copy);

router.post("/rename",auth_check,drive.Rename);

router.post("/new",auth_check,drive.New);

router.put("/upload",auth_check,multer,(req,res) => {
  return res.status(201).json({
    message:"File uploaded"
  })
});

module.exports = router;
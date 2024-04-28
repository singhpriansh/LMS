const express = require("express");
const router = express.Router();

const authmid = require("../middleware/auth_check");
const drive = require("../controllers/serverstore/filehandling");
const dl = require ("../controllers/serverstore/filedownloader");
const multer = require("../middleware/multerfile");

router.get("",(req,res) => {
  return res.send("storage")
});

router.post("",authmid.authcheck,drive.Viewfolder);
router.post("/download",authmid.authcheck,dl.Download);
router.post("/move",authmid.authcheck,drive.Move);
router.post("/copy",authmid.authcheck,drive.Copy);
router.post("/rename",authmid.authcheck,drive.Rename);
router.post("/new",authmid.authcheck,drive.New);

router.put("/upload",authmid.authcheck,multer,(req,res) => {
  return res.status(201).json({
    message: "File uploaded"
  })
});

module.exports = router;
const express = require("express");
const router = express.Router();

const userauth = require("../controllers/userauth");
const multerfile = require("../middleware/multerfile");

router.get("", (req,res,next) => {
  res.send("Faculty here");
})
router.post("/reg",multerfile,
  userauth.CreateFaculty,
  userauth.Login);

module.exports = router;
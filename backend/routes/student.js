const express = require("express");
const router = express.Router();

const userauth = require("../controllers/userauth");
const multerfile = require("../middleware/multerfile");

router.get("", (req,res,next) => {
  res.send("Students here");
})
router.post("/reg",multerfile,
  userauth.CreateStudent,
  userauth.Login);

module.exports = router;
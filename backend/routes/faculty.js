const express = require("express");
const router = express.Router();

const userauth = require("../controllers/userauth");

router.get("", (req,res,next) => {
  res.send("Faculty here");
})
router.post("/reg",userauth.CreateFaculty);

module.exports = router
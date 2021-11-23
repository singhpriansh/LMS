const express = require("express");
const router = express.Router();

const userAuth = require("../controllers/userauth");

router.get("", (req,res,next) => {
  res.send("Faculty here");
})
router.post("/reg",userAuth.CreateFaculty);

module.exports = router
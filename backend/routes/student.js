const express = require("express");
const router = express.Router();

const userauth = require("../controllers/userauth");

router.get("", (req,res,next) => {
  res.send("Students here");
})
router.post("/reg",userauth.CreateStudent);

module.exports = router
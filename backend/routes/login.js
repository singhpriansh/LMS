const express = require("express");
const router = express.Router();

const userAuth = require("../controllers/mongodb/userauth");

router.get("", (req,res,next) => {
  res.send("login route")
})
router.post("",userAuth.Login);

module.exports = router
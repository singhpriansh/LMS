const express = require("express");
const router = express.Router();

const userauth = require("../controllers/mongodb/userauth");

router.get("", (req,res,next) => {
  res.send("Students here");
})
router.post("/reg",
  userauth.CreateStudent,
  userauth.Login);

module.exports = router;
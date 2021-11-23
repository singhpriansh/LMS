const express = require("express");
const router = express.Router();

const multermiddextract = require("../middleware/multerfile");
const userAuth = require("../controllers/userauth");

router.get("", (req,res,next) => {
  res.send("Students here");
})
router.post("/reg",multermiddextract,userAuth.CreateStudent);

module.exports = router
const express = require("express");
const router = express.Router();

const auth_check = require("../middleware/auth_check");
const drive = require("../controllers/filehandling");

router.get("",(req,res,next) => {
  console.log("came here also");
})

router.post('',auth_check,drive.Viewfolder);

module.exports = router;
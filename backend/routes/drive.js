const express = require("express");
const router = express.Router();

const auth_check = require("../middleware/auth_check");

router.get("",(req,res,next) => {
  console.log("came here also");
})

router.post('',auth_check,(req, res, next) => {
  const path = req.body.path;
  console.log("Path:",path);
});

module.exports = router;
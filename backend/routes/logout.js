const express = require("express");
const router = express.Router();

router.post("",(req,res,next) =>{
  // express.static(path.join("backend/images"));
  res.status(205).json({
    message:"logged out"
  })
});

module.exports = router;
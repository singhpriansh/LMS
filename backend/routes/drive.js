const express = require("express");
const router = express.Router();

const multerfile = require("../middleware/multerfile");

router.get("",(req,res,next) => {
  console.log("came here also");
})

router.post('/file',(req, res, next)=> {
  console.log("came here");
  // res.status(201).send({
  //   message: "file saved",
  //   result: req.names
  // });
});

module.exports = router;
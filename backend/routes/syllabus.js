const express = require("express");
const router = express.Router();
const syllabus = require("../raw_data/syllabus");

router.get("", (req,res,next) => {
  res.status(200).json(syllabus);
})
// router.post("");

module.exports = router
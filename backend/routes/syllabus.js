const express = require("express");
const router = express.Router();
const { syllabus } = require("../raw_data/syllabus");

router.get("", (req,res,next) => {
  const SYLLABUS = syllabus;
  res.json(SYLLABUS);
})
// router.post("");

module.exports = router
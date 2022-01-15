const express = require("express");
const router = express.Router();

const semester = require("../controllers/mongodb/semester");
const syllabus = require("../controllers/mongodb/syllabus")

router.post("/new",semester.CreateSemester);
router.post("/syllabus",syllabus.CreateBranch);

module.exports = router;
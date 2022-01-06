const express = require("express");
const router = express.Router();

const userauth = require("../controllers/mongodb/semester");
const syllabus = require("../controllers/mongodb/syllabus")

router.post("/new",userauth.CreateSemester);
router.post("/syllabus",syllabus.CreateBranch);

module.exports = router;
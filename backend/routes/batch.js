const express = require("express");
const router = express.Router();

const semester = require("../controllers/mongodb/semester");

router.post("/new",semester.CreateSemester);

module.exports = router;
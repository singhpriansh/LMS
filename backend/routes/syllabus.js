const express = require("express");
const router = express.Router();

const syllabus = require("../controllers/mongodb/syllabus");
const cov_syllab = require("../controllers/mongodb/syllabus_covered");
const authmid = require("../middleware/auth_check");

router.get("", (req,res,next) => {
  res.status(200).json(syllabus);
})

router.post('/create', authmid.authcheck,
  authmid.loginmidware, syllabus.CreateBranch);
router.get('/student', authmid.authcheck,
  authmid.loginmidware, syllabus.GetStudentSyllabus);
router.get('/faculty', authmid.authcheck,
  authmid.loginmidware, syllabus.GetFacultySyllabus);
router.post('/covered', authmid.authcheck,
  authmid.loginmidware, cov_syllab.Covered_Syllabus);
router.get('/studentsyll', authmid.authcheck,
  authmid.loginmidware, cov_syllab.GetStudentSyllabusCovered);
router.get('/facultysyll', authmid.authcheck,
  authmid.loginmidware, cov_syllab.GetFacultySyllabusCovered);

module.exports = router
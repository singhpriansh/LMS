const express = require("express");
const router = express.Router();
const syllabus = require("../controllers/mongodb/syllabus");
const cov_syllab = require("../controllers/mongodb/syllabus_covered");
const auth_check = require("../middleware/auth_check");

router.get("", (req,res,next) => {
  res.status(200).json(syllabus);
})

router.post('/create',auth_check,syllabus.CreateBranch);
router.post('/student',auth_check,syllabus.GetStudentSyllabus);
router.post('/faculty',auth_check,syllabus.GetFacultySyllabus);
router.post('/covered',auth_check,cov_syllab.Covered_Syllabus);
router.post('/studentsyll',auth_check,cov_syllab.GetStudentSyllabusCovered);
router.post('/facultysyll',auth_check,cov_syllab.GetFacultySyllabusCovered);

module.exports = router
const express = require("express");
const router = express.Router();

const faculty = require("./faculty");
const student = require("./student");
const login = require("./login");
const syllabus = require("./syllabus");
const multerfile = require("../middleware/multerfile");

router.use('/faculty',multerfile,faculty);
router.use('/student',multerfile,student);
router.use('/login',login);
router.use('/syllabus',syllabus);
router.use('/file',multerfile, (req, res, next)=> {
  res.status(201).send({
    message: "created ok",
    result: req.files[0].originalname
  });
});

module.exports = router;
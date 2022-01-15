const express = require("express");
const router = express.Router();

const faculty = require("./faculty");
const student = require("./student");
const login = require("./login");
const logout = require("./logout");
const syllabus = require("./syllabus");
const drive = require("./drive");
const batch = require("./batch");

router.use('/faculty',faculty);
router.use('/student',student);
router.use('/login',login);
router.use('/logout',logout);
router.use('/syllabus',syllabus);
router.use('/storage',drive);
router.use('/batch',batch);

module.exports = router;
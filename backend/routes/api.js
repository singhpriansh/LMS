const express = require("express");
const router = express.Router();

const faculty = require("./faculty");
const student = require("./student");
const login = require("./login")

router.use('/faculty',faculty);
router.use('/student',student);
router.use('/login',login);

module.exports = router;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Faculty = require("../models/faculty");

exports.CreateStudent = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const student = new Student({
      name: req.body.name,
      pic:req.body.pic.toLowerCase().split(' ').join('_'),
      id: req.body.id,
      dobirth: req.body.dobirth,
      gender: req.body.gender,
      qualdegree: req.body.qualdegree,
      branch: req.body.branch,
      doadmitn: req.body.doadmitn,
      password: hash,
    });
    student.save().then(result => {
      res.status(201).json({
        message: "New Student registered",
        result: result
      });
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'Invalid authentication credentials'
      });
    });
  });
}

exports.CreateFaculty = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const faculty = new Faculty({
      name: req.body.name,
      pic: req.body.pic.toLowerCase().split(' ').join('_'),
      id: req.body.id,
      dobirth: req.body.dobirth,
      gender: req.body.gender,
      qualdegree: req.body.qualdegree,
      qualcert: req.body.qualcert.toLowerCase().split(' ').join('_'),
      dojoin: req.body.dojoin,
      password: hash
    });
    faculty.save().then(result => {
      res.status(201).json({
        message: "New Faculty registered",
        result: result
      });
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'Invalid authentication credentials'
      });
    });
  });
}
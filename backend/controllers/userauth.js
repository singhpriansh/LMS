const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Faculty = require("../models/faculty");

exports.CreateStudent = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const student = new Student({
      name: req.body.name,
      pic:req.body.pic,
      gender: req.body.gender,
      dobirth: req.body.dobirth,
      qualdegree: req.body.qualdegree,
      branch: req.body.branch,
      id: req.body.id,
      doadmitn: req.body.doadmitn,
      password: req.body.password
    })
  })
}

exports.CreateFaculty = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const Faculty = new Faculty({
      name: req.body.name,
      pic: req.body.pic,
      gender: req.body.gender,
      dobirth: req.body.dobirth,
      qualdegree: req.body.qualdegree,
      qualcert: req.body.qualcert,
      id: req.body.id,
      dojoin: req.body.dojoin,
      password: req.body.password
    })
  })
}
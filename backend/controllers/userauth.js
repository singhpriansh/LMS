const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const User = require("../models/user");
const database = require("./database").database;

exports.CreateStudent = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    database.collection('users').insertOne({
      user: "Student",
      name: req.body.name,
      picname:req.body.picname,
      id: Number(req.body.id),
      dobirth: new Date(req.body.dobirth),
      gender: req.body.gender,
      qualdegree: req.body.qualdegree,
      branch: req.body.branch,
      dateofadmittion: new Date(req.body.doadmitn),
      password: hash,
    }).then(result => {
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
  //   user.save().then(result => {
  //     res.status(201).json({
  //       message: "New Student registered",
  //       result: result
  //     });
  //   }).catch(err => {
  //     console.log(err)
  //     res.status(500).json({
  //       message: 'Invalid authentication credentials'
  //     });
  //   });
  });
}

exports.CreateFaculty = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    database.collection('users').insertOne({
      user: "Faculty",
      name: req.body.name,
      picname: req.body.picname,
      id: Number(req.body.id),
      dobirth: new Date(req.body.dobirth),
      gender: req.body.gender,
      qualdegree: req.body.qualdegree,
      certname: req.body.certname,
      dojoin: new Date(req.body.dojoin),
      password: hash
    }).then(result => {
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

exports.Login = (req,res,next) => {
  let fetcheduser;
  database.collection('users').findOne({ id: req.body.id })
  .then(user => {
    if(!user){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetcheduser = user;
    return bcrypt.compare(req.body.password,user.password);
  }).then(result => {
    if(!result){
      return res.status(401).json({
        message: "Access denied, error"
      });
    }
    const token = jwt.sign({
      id: fetcheduser.id,
    }, 'complex_text');
    res.status(200).json({
      token: token,
      user: fetcheduser
    });
  }).catch(err => {
    return res.status(401).json({
      message: 'Invalid authentication credentials!' + err
    });
  });
}

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.CreateStudent = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      user: "Student",
      name: req.body.name,
      picname:req.body.picname,
      id: req.body.id,
      dobirth: req.body.dobirth,
      gender: req.body.gender,
      qualdegree: req.body.qualdegree,
      cert_branch: req.body.branch,
      do_join_admitn: req.body.doadmitn,
      password: hash,
    });
    user.save().then(result => {
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
    const user = new User({
      user: "Faculty",
      name: req.body.name,
      picname: req.body.picname,
      id: req.body.id,
      dobirth: req.body.dobirth,
      gender: req.body.gender,
      qualdegree: req.body.qualdegree,
      cert_branch: req.body.certname,
      do_join_admitn: req.body.dojoin,
      password: hash
    });
    user.save().then(result => {
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
  User.findOne({ id: req.body.id }).then(user => {
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
      user:{
        user: fetcheduser.user,
        name: fetcheduser.name,
        picname: fetcheduser.picname,
        id: fetcheduser.id,
        dobirth: fetcheduser.dobirth,
        gender: fetcheduser.gender,
        qualdegree: fetcheduser.qualdegree,
        cert_branch: fetcheduser.certname,
        do_join_admitn: fetcheduser.dojoin,
      }
    });
  }).catch(err => {
    return res.status(401).json({
      message: 'Invalid authentication credentials!' + err
    });
  });
}

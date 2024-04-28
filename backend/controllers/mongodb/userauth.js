const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const User = require("../models/user");
const fs = require("fs");
const database = require("./database").database;
const semester = require("./semester");
const drive = require("../serverstore/filehandling");

exports.CreateStudent = (req, res, next) => {
  database.collection('users').findOne({ id: req.body.id })
  .then(user => {
    if(user){
      return res.status(409).json({
        message: "User already exist"
      })
    } else {
      bcrypt.hash(req.body.password, 10).then(hash => {
        database.collection('users').insertOne({
          user: "Student",
          name: req.body.name,
          picname: req.body.picname,
          id: req.body.id,
          dobirth: new Date(req.body.dobirth),
          gender: req.body.gender,
          qualdegree: req.body.qualdegree,
          branch: req.body.branch,
          dateofadmittion: new Date(req.body.doadmitn),
          password: hash,
        }).then(response => {
          drive.Initialise_dir(response.insertedId.toString());
          semester.Add_Students_To_Batch(
            req.body.doadmitn.toString().split("-")[0],
            req.body.qualdegree,
            req.body.branch,
            "Semester 1",
            response.insertedId.toString()
          ).then(response => {
            console.log(response);
            next();
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err);
          res.status(500).json({
            message: 'Invalid authentication credentials'
          });
        });
      });
    }
  });
}

exports.CreateFaculty = (req, res, next) => {
  const id = Number(req.body.id);
  if (id === 1001001001) {
    bcrypt.hash(req.body.password, 10).then(hash => {
      database.collection('users').updateOne(
        { id: id },
        { $set : {
          user: "Dean",
          picname: req.body.picname,
          id: id,
          dobirth: new Date(req.body.dobirth),
          gender: req.body.gender,
          qualdegree: req.body.qualdegree,
          certname: req.body.certname,
          dojoin: new Date(req.body.dojoin),
          password: hash
        }}
      ).then(resp => {
        console.log(resp);
        next();
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'Invalid authentication credentials'
        });
      });
    })
  } else {
    database.collection('users').findOne({ id: id })
    .then(user => {
      if(user) {
        return res.status(409).json({
          message: "User already exist"
        })
      } else {
        bcrypt.hash(req.body.password, 10).then(hash => {
          database.collection('users').insertOne({
            user: "Faculty",
            picname: req.body.picname,
            id: id,
            dobirth: new Date(req.body.dobirth),
            gender: req.body.gender,
            qualdegree: req.body.qualdegree,
            certname: req.body.certname,
            dojoin: new Date(req.body.dojoin),
            password: hash
          }).then(response => {
            drive.Initialise_dir(response.insertedId.toString());
            next();
          }).catch(err => {
            console.log(err)
            res.status(500).json({
              message: 'Invalid authentication credentials'
            });
          });
        });
      }
    });
  }
}

exports.Login = (req,res,next) => {
  let fetcheduser;
  database.collection('users').findOne({ id: Number(req.body.id) })
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
      id: fetcheduser._id,
    }, 'complex_text');
    return res.status(200).json({
      token: token,
      user: {
        _id:fetcheduser._id,
        id: fetcheduser.id,
        user: fetcheduser.user,
        name: fetcheduser.name,
        picname: fetcheduser.picname,
        dobirth: fetcheduser.dobirth,
        gender: fetcheduser.gender,
        qualdegree: fetcheduser.qualdegree,
        branch: fetcheduser.branch,
        dateofadmittion: fetcheduser.dateofadmittion,
        certname: fetcheduser.certname,
        dojoin: fetcheduser.dojoin      
      }
    });
  }).catch(err => {
    return res.status(401).json({
      message: 'Invalid authentication credentials!'
    });
  });
}

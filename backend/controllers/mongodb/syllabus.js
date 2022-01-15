const database = require("./database").database;

exports.CreateBranch = (req,res) => {
  database.collection('syllabuses').findOne({ branch : req.body.branch })
  .then(syllabus => {
    if(syllabus){
      const subjects = Object.assign(syllabus.subjects,req.body.subjects);
      database.collection('syllabuses').updateOne(
      { branch : req.body.branch },
      {
        $set : {
          "subjects" : subjects
        }
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Subject added to branch"
        })
      })
      .catch(err => {
        console.log("Error: ",err);
        res.status(500).json({
          message: "Error occured adding subject to branch"
        })
      })
    } else {
      database.collection('syllabuses').insertOne({
        "branch" : req.body.branch,
        "subjects" : req.body.subject
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "New branch created with syllabus added"
        })
      })
      .catch(err => {
        console.log("Error: ",err);
        res.status(500).json({
          message: "Error occured creating branch"
        })
      })
    }
  }).catch(err => {
    console.log("Error: ",err);
    res.status(500).json({
      message: "Error occured creating branch"
    })
  })
}

exports.GetStudentSyllabus = (req,res) => {
  database.collections('syllabuses')
  .findOne({ branch : req.body.branch })
  .then(syllabus => {
    if (syllabus) {
      res.status(202).json(syllabus)
    } else {
      res.status(202).json({
        message: "Not available"
      })
    }
  })
}

exports.GetFacultySyllabus = (req,res) => {
  response = {};
  req.body.branches.forEach(item => {
    database.collections('syllabuses')
    .findOne({ branch : item.branch })
    .then(syllabus => {
      if (syllabus) {
        response = Object.assign(syllabus[item.code],response);
      }
    })
  });
  res.status(202).json(response);
}
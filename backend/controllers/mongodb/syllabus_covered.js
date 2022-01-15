exports.Covered_Syllabus = (req,res,next) => {
  database.collection('covered_syllabus').findOne({ year : req.body.year })
  .then(syllabus => {
    if(syllabus) {
      const subjects = Object.assign(syllabus.subjects,req.body.sub_syllabus);
      database.collection('covered_syllabus').updateOne(
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
      database.collection('covered_syllabus').insertOne({
        "year" : req.body.year,
        "branch" : req.body.branch,
        "subjects" : req.body.sub_syllabus
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

exports.GetStudentSyllabusCovered = (req,res) => {
  database.collections('covered_syllabus')
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

exports.GetFacultySyllabusCovered = (req,res) => {
  response = {};
  req.body.branches.forEach(item => {
    database.collections('covered_syllabus')
    .findOne({ branch : item.branch })
    .then(syllabus => {
      if (syllabus) {
        response = Object.assign(syllabus[item.code],response);
      }
    })
  });
  res.status(202).json(response);
}

// code: {
//   unit: 0,
//   sections: 0,
//   topics: 0,
//   days: [],
//   covered: [],
// }

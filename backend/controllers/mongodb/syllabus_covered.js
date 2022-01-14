exports.Covered_Syllabus = (req,res,next) => {
  database.collection('covered_syllabus').findOne({ branch : req.body.branch })
  .then(syllabus => {
    if(syllabus) {
      const code = req.body.code;
      const subjects = Object.assign(syllabus.subjects,req.body.subjects);
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

// syllabus: {
//   unit: 0,
//   sections: 0,
//   topics: 0
// }

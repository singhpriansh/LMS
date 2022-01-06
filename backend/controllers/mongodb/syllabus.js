const database = require("./database").database;
const SYLLABUS = require("../../raw_data/syllabus")

exports.CreateBranch = (req,res,next) => {
  database.collection('syllabuses')
  .updateOne({ branch : req.body.branch },
      { $set : {
        "subjects" : SYLLABUS[0].subjects
      }
    },
    { upsert : true })
  .then(branch => {
    console.log(branch);
    res.status(201).json({
      message: "Branch created"
    })
  }).catch(err => {
    console.log("Error: ",err);
    res.status(500).json({
      message: "Error occured creating branch"
    })
  })
}
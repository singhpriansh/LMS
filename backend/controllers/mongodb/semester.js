const database = require("./database").database;

const sem = {
  'Teachers': [],
  'Subjects': [],
  'Students': [],
};

const _4_yr_sem = {
  'Semester 1': sem,
  'Semester 2': sem,
  'Semester 3': sem,
  'Semester 4': sem,
  'Semester 5': sem,
  'Semester 6': sem,
  'Semester 7': sem,
  'Semester 8': sem,
};

const _2_yr_sem = {
  'Semester 1': sem,
  'Semester 2': sem,
  'Semester 3': sem,
  'Semester 4': sem,
};

exports.CreateSemester = (req,res,next) => {
  database.collection('semesters')
  .findOne({ year: req.body.year, sem: req.body.sem })
  .then(sem => {
    if (sem) {
      return res.status(409).json({
        message: "semester already made"
      })
    } else {
      const batch = {
        'Bachelors in Technology': {
          'Computer Science and Engineering': _4_yr_sem,
          'Electronics and Communication Engineering': _4_yr_sem,
          'Electrical and Electronics Engineering': _4_yr_sem,
          'Electrical Engineering': _4_yr_sem,
          'Mechanical Engineering': _4_yr_sem
        },
        'Masters in Technology': {
          'Computer Science and Engineering': _2_yr_sem,
          'Electronics and Communication Engineering': _2_yr_sem,
          'Electrical and Electronics Engineering': _2_yr_sem,
          'Electrical Engineering': _2_yr_sem,
          'Mechanical Engineering': _2_yr_sem
        },
        'Bachelors in Science': {},
        'Masters in Science': {},
        'Masters of Bussiness Administration': {},
        'Doctor of Philosophy': {}
      }
      database.collection('semesters').insertOne({
        year: 2022,
        sem: 'odd',
        batch: batch
      }).then(response => {
        console.log(response);
        res.status(201).json({
          message: "Semester created"
        });
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Error creating new semester"
        })
      });
    }
  });
}
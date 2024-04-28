const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb')
const database = require("../controllers/mongodb/database").database;

exports.authcheck = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'complex_text');
    req.userData = {
      id: decodedToken.id,
    };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'You are not autheticated!'
    });
  }
};

exports.loginmidware = (req,res,next) => {
  database.collection('users').findOne({ _id: new ObjectId(req.userData.id) })
  .then(result => {
    if(result) {
      req.body = result;
      next();
    } else {
      res.status(204).json({
        message: "Unable to find user."
      });
    }
  })
}
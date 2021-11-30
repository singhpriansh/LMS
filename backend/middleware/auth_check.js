const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'complex_text');
    console.log(req)
    // req.userData = {
    //   id: decodedToken.id,
    //   userId: decodedToken.userId
    // };
    // next();
  } catch (error) {
    res.status(401).json({
        message: 'You are not autheticated!'
    });
  }
};
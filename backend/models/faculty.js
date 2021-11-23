const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const facultySchema = mongoose.Schema({
  name: {type: String, required: true },
  pic:{type: String, required: true },
  gender:{type: String, required: true },
  dobirth: {type:Date, required: true },
  qualification: {type: String, required: true },
  qualcert: {type: String, required: true },
  id: {type: Number, required: true, unique: true },
  dojoin: {type: Date, required: true},
  password: {type: String, required: true }
});

facultySchema.plugin(uniqueValidator);
module.exports = mongoose.model("Faculty",facultySchema);
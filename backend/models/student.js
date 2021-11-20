const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const studentSchema = mongoose.Schema({
  name: {type: String, required: true },
  pic:{type: String, required: true },
  gender:{type: String, required: true },
  dobirth: {type:Date, required: true },
  qualdegree: {type: String, required: true },
  branch: {type: String, required: true },
  id: {type: Number, required: true, unique: true },
  doadmitn: {type: Number, required: true},
  password: {type: String, required: true }
});

studentSchema.plugin(uniqueValidator);
module.exports = mongoose.model("sudent",studentSchema);
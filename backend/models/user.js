const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  user: {type: String, required: true },
  name: {type: String, required: true },
  picname:{type: String, required: true },
  gender:{type: String, required: true },
  dobirth: {type:Date, required: true },
  qualdegree: {type: String, required: true },
  cert_branch: {type: String, required: true },
  id: {type: Number, required: true, unique: true },
  do_join_admitn: {type: Date, required: true},
  password: {type: String, required: true }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User",userSchema);
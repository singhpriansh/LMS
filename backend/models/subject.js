const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const subjectSchema = mongoose.Schema ({
  name: {type: String, required: true },
  code: {type: String, required: true, unique: true },
  unit: [
    {
      unit_number: {type: Number, required: true },
      sections: [
        {
          name: {type: String, required: true },
          section_topics: [
            {type: String, required: true }
          ],
        }
      ]
    }
  ]
});

subjectSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Subject",subjectSchema);
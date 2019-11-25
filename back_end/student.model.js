const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Student = new Schema({
  _id: {
    type: Number
  },
  student_name: {
    type: String
  },
  _student_address: {
    type: Schema.Types.ObjectId
  },
  _student_schedule: {
    type: [Schema.Types.ObjectId]
  },
  _student_preferences: {
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model("Student", Student);

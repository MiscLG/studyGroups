const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Course = new Schema({
  _id: {
    //CRN
    type: Number
  },
  course_name: {
    type: String
  },
  course_instructor_name: {
    type: String
  },
  _course_roster: {
    type: [String]
  },
  _course_schedule: {
    type: [Schema.Types.ObjectId]
  }
});

module.exports = mongoose.model("Course", Course);

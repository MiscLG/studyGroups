const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let studyLocation = new Schema({
  studyLocation_name: {
    type: String
  },
  studyLocation_noise_level: {
    type: Number
  },
  studyLocation_availability: {
    type: Number
  },
  _studyLocation_address: {
    type: Schema.Types.ObjectId
  },
  _studyLocation_schedule: {
    type: [Schema.Types.ObjectId]
  }
});

module.exports = mongoose.model("studyLocation", studyLocation);

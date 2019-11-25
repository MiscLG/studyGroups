const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ScheduleEntry = new Schema({
  start_time: {
    type: Number
  },
  end_time: {
    type: Number
  },
  day: {
    type: String
  }
});

module.exports = mongoose.model("ScheduleEntry", ScheduleEntry);

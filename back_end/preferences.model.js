const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Preferences = new Schema({
  preference_noise_level: {
    type: Number
  },
  preference_distance: {
    type: Number
  },
  preference_study_duration: {
    type: Number
  }
});

module.exports = mongoose.model("Preferences", Preferences);

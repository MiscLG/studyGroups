const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Address = new Schema({
  address_name: {
    type: String
  },
  address_street: {
    type: String
  },
  address_city: {
    type: String
  },
  address_zip: {
    type: Number
  }
});

module.exports = mongoose.model("Address", Address);

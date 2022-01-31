const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let employees = new Schema({
  name: String,
  image: String,
});

module.exports = mongoose.model("employees", employees);

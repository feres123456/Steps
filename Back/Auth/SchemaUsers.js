const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
  name: String,
  email: String,
  password: String,
  admin: String,
  employees: String,
});

module.exports = mongoose.model("User", User);

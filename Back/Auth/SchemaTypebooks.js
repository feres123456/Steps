const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Typebooks = new Schema({
  name: String,
});

module.exports = mongoose.model("Typebooks", Typebooks);

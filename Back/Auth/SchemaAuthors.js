const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let authors = new Schema({
  name: String,
});

module.exports = mongoose.model("authors", authors);

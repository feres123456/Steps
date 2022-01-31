const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let list = new Schema({
  booksname: String,
  bookspdf: String,
  authorsname: String,
  bookstype: String,
});

module.exports = mongoose.model("list", list);

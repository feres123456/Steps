const mongoose = require('mongoose') ;
const Schema = mongoose.Schema

let list = new Schema( {
    name : String ,
    email : String,
    password : String
});

module.exports = mongoose.model('list' , list);
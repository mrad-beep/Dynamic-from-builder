const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({

title:String,

fields:Array,

responses:Array

});

module.exports = mongoose.model("Form",FormSchema);
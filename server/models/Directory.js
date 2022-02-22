const mongoose = require("mongoose");

const secondary = new mongoose.Schema({
   author:{type: String},
  title:{type:String}
})

const primary = new mongoose.Schema({
  name:{type: String},
  secondary:[secondary]
})
const schema = new mongoose.Schema({
  magazine:  { type: mongoose.SchemaTypes.ObjectId, ref: "Magazine" },
  primary:[primary]
})
const Directory = mongoose.model("Directory", schema);
module.exports = Directory;
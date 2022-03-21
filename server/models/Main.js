const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  host: {type:String},
  cycle: {type:String},
  language: [{type:String}],
  ISSN: {type:String},
  CN:{type:String},
  initiateDate:{type:Number},
});
module.exports = mongoose.model("Main", schema);

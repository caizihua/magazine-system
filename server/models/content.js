const mongoose = require("mongoose"); 
const schema = new mongoose.Schema({
  parent:{ type: mongoose.SchemaTypes.ObjectId, ref: "Period" },
  number:{ type: String},
  cover: { type: String},
  directory:{ type: mongoose.SchemaTypes.ObjectId, ref: "Directory"}
})

module.exports = mongoose.model("Content", schema);
const mongoose = require("mongoose"); 

const schema = new mongoose.Schema({
  name:{ type: mongoose.SchemaTypes.ObjectId, ref: "Main" },
  year:{ type: Number},
  number:{ type: String},
  cover: { type: String},
  price:{type:Number},
  directory:{ type: mongoose.SchemaTypes.ObjectId, ref: "Directory"}
});
module.exports = mongoose.model("Period", schema);

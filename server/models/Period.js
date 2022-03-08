const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  cover: { type: String },
  name:{ type: mongoose.SchemaTypes.ObjectId, ref: "Magazine" },
  period:{type: String},
  directory:{ type: String}
});
module.exports = mongoose.model("Period", schema);

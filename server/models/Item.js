const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  cover: { type: String },
  name: { type: String },
  categories:  [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }]
});
module.exports = mongoose.model("Item", schema);

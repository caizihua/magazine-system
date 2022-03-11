const mongoose = require("mongoose"); 

const period = new mongoose.Schema({
  year:{ type: Number},
  content:[{ type: mongoose.SchemaTypes.ObjectId, ref: "Content" }]
})

const schema = new mongoose.Schema({
  name:{ type: mongoose.SchemaTypes.ObjectId, ref: "Main" },
  period:[period],
});
module.exports = mongoose.model("Period", schema);

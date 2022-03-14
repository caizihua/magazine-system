const mongoose = require("mongoose"); 

const period = new mongoose.Schema({
  year:{ type: Number},
  content:[{
    number:{ type: String},
    cover: { type: String},
    directory:{ type: mongoose.SchemaTypes.ObjectId, ref: "Directory"}
  }]
})

const schema = new mongoose.Schema({
  name:{ type: mongoose.SchemaTypes.ObjectId, ref: "Main" },
  period:[period],
});
module.exports = mongoose.model("Period", schema);

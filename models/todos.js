const mongoose = require('mongoose')
let Schema = mongoose.Schema

const todoSchema = new Schema({
  title:{
    type:String,
    require:true,
  },
  description:{
    type:String,
    require: true
  },
  status:{
    type:String,
    require:true
  }
})

let todo = mongoose.model("Todo", todoSchema)
module.exports = todo;

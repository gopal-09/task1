const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const SchemaTypes=mongoose;
const detailSchema=new Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },

age:{
 type:Number,
 required:true  
},
  
mobile:{
    type:String,
    required:true,
    unique:true
  },
  salary:{
    type:Number,
    required:true  
   },
  department:{
    type:String,
    required:true
  }})
module.exports= mongoose.model('details',detailSchema);
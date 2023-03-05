var MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
 name:{
    type : String,
    required :true
 },
 email:{
   type : String,
   required :true,
 },
 password:{
   type:String,
   required:true,
   unique:true
 },
 data:{
  type:Date,
  default:Date.now
  
 }
});

const userData = mongoose.model('userData',userSchema);

module.exports = userData
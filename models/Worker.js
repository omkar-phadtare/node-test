const mongoose = require('mongoose');
const { Schema } = mongoose;

const workerSchema = new Schema({
 wname :{
    type : String,
    required :true
 },
 email:{
    type: String
 },
 mobileno:{
    type: Number,
    required :true,
    unique:true
 },
 age:{
    type:Number,
    min:18,
    max:60
 },
 wpassword:{
   type:String
 },
 date:{
   type:Date,
   default:Date.now
 },
 
});

const workerData = mongoose.model('workers',workerSchema);
workerData.createIndexes();
module.exports = workerData
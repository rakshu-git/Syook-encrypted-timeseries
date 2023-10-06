const mongoose = require('mongoose')

const {Schema,model} = mongoose

 const sensor = model("sensor",new Schema({
    name:String,
    
 },{timestamps:true}))

 module.exports = sensor
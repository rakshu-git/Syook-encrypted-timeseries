 const mongoose = require('mongoose')

 const connectDB = async (req,res)=>{
    try{
        const db = await mongoose.connect(`mongodb://127.0.0.1:27017/IoT-Task`)
            console.log("connected to the Data BAse")
    }catch(e){

        console.log('error in connecting the dataBAse')
    }
 }

 module.exports = connectDB
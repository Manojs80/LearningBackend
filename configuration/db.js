import mongoose from "mongoose";
import 'dotenv/config' 

export const connectDB = async ()=>{
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log("ss")
    } catch (error) {
      console.log(error)  
    }
   
}
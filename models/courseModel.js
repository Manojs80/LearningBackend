import mongoose from 'mongoose';


const courseSchema = new mongoose.Schema ({
  title: {
    type:String,
    required:true,
  }, 
  desc:{
    type:[String,"Please enter a string"],
        
  },
  image:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNFao0fPznjqXWepZBQuAZhbEUtabbnM32MblYxtCBNecS2qBLyXVHJBITWcxKbfKsD8&usqp=CAU",
 },
 duration:{
    type:Number,
    required:true,
 },
 instructor:{
    type:mongoose.Types.ObjectId,
    ref:"instructor",
},

 
});
export const course = mongoose.model("course",courseSchema);
import mongoose from 'mongoose';


const courseSchema = new mongoose.Schema ({
  title: {
    type:String,
    required:true,
  }, 
  description:{
    type:String,
    required:true,        
  },
  image:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNFao0fPznjqXWepZBQuAZhbEUtabbnM32MblYxtCBNecS2qBLyXVHJBITWcxKbfKsD8&usqp=CAU",
 },
 duration:{
    type:Number,
    required:true,
 },
 fee:{
  type:Number,
  required:true,
},
 objectives:{
  type:[String],
  default: [],
}, 
assignment:{
  type:mongoose.Types.ObjectId,
  ref:"assignment",
},
quiz:[{
  type:mongoose.Types.ObjectId,
  ref:"Quiz",
}],
 instructor:{
    type:mongoose.Types.ObjectId,
    ref:"Instructor",
},
user:[{
  type:mongoose.Types.ObjectId,
  ref:"User",
}]
},
{timestamps: true},
);
export const course = mongoose.model("course",courseSchema);
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: {
   type:String,
   required:true,
   maxLength:50,
  }, 
  email: {  
   type:String,
   required:true,
   minLength:5,
   maxLength:50, },
  password:{  
   type:String,
   required:true,
   minLength:6, },
  mobile: {  
   type:Number,
   required:true,
   },
  profilepic:{  
   type:String,
   default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNFao0fPznjqXWepZBQuAZhbEUtabbnM32MblYxtCBNecS2qBLyXVHJBITWcxKbfKsD8&usqp=CAU",

   }, 
 courses:[{
    type:mongoose.Types.ObjectId,
    ref:'course'
 }],
},
   { timestamps: true},
);
export const User = mongoose.model('User',userSchema);
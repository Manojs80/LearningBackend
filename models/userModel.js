import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: {
   type:String,
   required:true,
   maxlength:50,
  }, 
  email: {  
   type:String,
   required:true,
   minlength:5,
   maxlength:50,
   unique: true,
},
  password:{  
   type:String,
   required: true,
   minlength:6, 
  },
 role: {
      type: String,
      required: true,
  },
  mobile: {  
   type:String,
   required:true,
   },
  profilepic:{  
   type:String,
   default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNFao0fPznjqXWepZBQuAZhbEUtabbnM32MblYxtCBNecS2qBLyXVHJBITWcxKbfKsD8&usqp=CAU",

   }, 
 courses:{
    type:mongoose.Types.ObjectId,
    ref:'course'
 },
},
   { timestamps: true},
);
export const User = mongoose.model('User',userSchema);
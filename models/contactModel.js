import mongoose from 'mongoose';


const contactSchema = new mongoose.Schema({
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
},
  mobile: {  
  type:String,
 },
  message: {  
    type:String,
 },
},
   { timestamps: true},
);
export const Contact = mongoose.model('Contact',contactSchema);
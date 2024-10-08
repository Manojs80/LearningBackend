import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
    {
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
            }, 
          courses:[{
             type:mongoose.Types.ObjectId,
             ref:'course'
          }],
         },
            { timestamps: true},
         );
export const Instructor = mongoose.model("Instructor", instructorSchema);
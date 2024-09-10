import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
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
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        courses: [{ type: mongoose.Types.ObjectId, ref: "course" }],
    },
    { timestamps: true },
);

export const Admin = mongoose.model("Admin", adminSchema);
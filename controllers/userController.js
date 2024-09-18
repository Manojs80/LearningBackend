import bcrypt from 'bcryptjs';
import {User} from "../models/userModel.js"
import { generateUserToken } from "../utils/generativeToken.js";
import { cloudinaryInstance } from "../configuration/cloudinary.js";


export const userCreate = async(req,res,next)=>{
    try {
        console.log("userCreate");
        const { name , email , password , mobile , role, courses } = req.body;
        console.log("usercreate ",req.body )
        if (!name || !password || !mobile || !email) {            
            return res.status(400).json({ success: false , message: "all fields required"});    
        }

        const userExist = await User.findOne({email})
        if (userExist) { return  res.status(400).json({ success: false , message: "already exist"});  
        }

       const salt = 10;
       const hashedpassword = bcrypt.hashSync(password, salt);  
       if (!req.file) {
        console.log("image not visible");
        return res.status(400).json({ message: "image not visible" });
         }
       // Upload an image
       const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path).catch((error) => {
        console.log(error);
        });
        console.log(uploadResult);   
      
        const newUser = new User( { name , email , password: hashedpassword , mobile  , role, courses }) ;  
       if (uploadResult?.url) {
        newUser.profilepic = uploadResult.url;
         } 
    
       await newUser.save();

       const token = generateUserToken(email,"User");
       // res.cookie("token", token );
       res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure if in production
        sameSite: 'None', // Required for cross-origin requests
        path: '/' // Ensure cookie is accessible across all paths
      });
       res.json({ success: true , message: "user created succcesfuly"})
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false ,  message: "intern server"});
    }
}

export const userLogin = async(req,res,next)=>{
    try {
        console.log("userlogin");
        
        const {  email, password  } = req.body;
        if ( !password ||  !email) {
            return res.status(400).json({ success: false , message: "all fields required"});
            
        }
        const userExist = await User.findOne({email})
        if (!userExist) { return  res.status(400).json({ success: false , message: "user does not exist"});  
         }

         const passwordMatch = bcrypt.compareSync(password, userExist.password);
         if (!passwordMatch) { return  res.status(400).json({ success: false , message: "does not match"});  
        }
        
        console.log("userlogin",email);
        const token = generateUserToken(email,"User");
        console.log("userlogin token",token);
       // res.cookie("token",token);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure if in production
            sameSite: 'None', // Required for cross-origin requests
            path: '/' // Ensure cookie is accessible across all paths
          });
        res.json({ success: true , message: "user login succcesfuly" , data:userExist})

    } catch (error) {
        res.status(500).json({ message: "intern server"});
    }
}

export const userProfile = async(req,res,next)=>{
    try {
        const {id}= req.params;
        const userData = await User.findById(id).select("-password");
         res.json({ success: true , message: "user profile fetch succcesfuly" , data:userData})

    } catch (error) {
        res.status(400).json({ message: "intern server error"});
    }
}
 
export const userUpdate = async(req,res,next)=>{
    try {
     let {name , email , password , mobile , profilepic ,role , courses } = req.body;
     const {id} = req.params;
     console.log("Updating user with ID:", id);
     console.log("Update details:", { name, email, mobile, profilepic,role, courses });
        const salt = 10;
       const hashedpassword = bcrypt.hashSync(password, salt);
       if (req.file) {
        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path).catch((error) => {
            console.log(error);
            });
            // console.log(uploadResult);  
        
       // Upload an image   
       if (uploadResult?.url) {
         profilepic = uploadResult.url;
         }
         }

      const updatedUser = await User.findByIdAndUpdate(id,{name , email , password: hashedpassword , profilepic , mobile , role, courses },{new:true}); 
      
     
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
      console.log(" message: User updated succcesfuly",updatedUser)
       res.json({ success: true , message: "User updated succcesfuly" , data:updatedUser });   
      console.log(" message: User updated succcesfuly")
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(400).json({ message: "User intern server error"});
    }
};
//
export const userList = async(req,res,next)=>{
    try {
     const ListUser = await User.find();
     res.json({ success: true , message: "course fetch succcesfuly" , data:ListUser});   

    } catch (error) {
        res.status(400).json({ message: "internal User server error"});
    }
};

export const userDelete = async(req,res,next)=>{
    try {
    
     const {id} = req.params;

      await User.findByIdAndDelete(id); 

     res.json({ success: true , message: "User deleted succcesfuly" });   

    } catch (error) {
        res.status(400).json({ message: " User intern server error"});
    }
};

export const checkUser = async(req,res,next)=>{
    try {
     const user = req.user;
     if (!user) 
        { return  res.status(400).json({ success: true , message: "user not authenticated"});  
         }
    res.json({ success: true , message: "user  authenticated"})

    } catch (error) {
        res.status(400).json({ message: "intern server error"});
    }
}

export const UserCourseAdd = async(req,res,next)=>{
    try {
        const {id} = req.params;
     const { email } = req.user;
     const userExist = await User.findOne({email})

     const Learnerid = userExist._id;
     const updatedUser = await User.findByIdAndUpdate(Learnerid,{
         courses: id },{new:true}); 
      
   
         if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
          console.log(" message: User updated succcesfuly",updatedUser)
           res.json({ success: true , message: "User updated succcesfuly" , data:updatedUser });   
          console.log(" message: User updated succcesfuly")
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(400).json({ message: "User intern server error"});
        }
}
import bcrypt from "bcrypt";
import {User} from "../models/userModel.js"
import { generateUserToken } from "../utils/generativeToken.js";



export const userCreate = async(req,res,next)=>{
    try {
        console.log("here");
        const { name , email , password , mobile , profilepic , courses } = req.body;
        console.log("usercreate ",req.body.name )
        if (!name || !password || !mobile || !email) {            
            return res.status(400).json({ success: false , message: "all fields required"});    
        }

        const userExist = await User.findOne({email})
        if (userExist) { return  res.status(400).json({ success: false , message: "already exist"});  
        }

       const salt = 10;
       const hashedpassword = bcrypt.hashSync(password, salt);     
       const newUser = new User( { name , email , password: hashedpassword , mobile , profilepic , courses }) ;  
       await newUser.save();

       const token = generateUserToken(email,"User");
       res.cookie("token", token );
       res.json({ success: true , message: "user created succcesfuly"})
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false ,  message: "intern server"});
    }
}

export const userLogin = async(req,res,next)=>{
    try {
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

        const token = generateUserToken(email,"User");
        res.cookie("token", token );
        res.json({ success: true , message: "user login succcesfuly"})

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
     const {name , email , password , mobile , profilepic , courses } = req.body;
     const {id} = req.params;
     console.log("Updating user with ID:", id);
     console.log("Update details:", { name, email, mobile, profilepic, courses });
      const updatedUser = await User.findByIdAndUpdate(id,{name , email , password , mobile , profilepic , courses },{new:true}); 
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

export const userDelete = async(req,res,next)=>{
    try {
    
     const {id} = req.params;

      await User.findByIdAndDelete(id); 

     res.json({ success: true , message: "User deleted succcesfuly" });   

    } catch (error) {
        res.status(400).json({ message: " User intern server error"});
    }
};

// export const checkUser = async(req,res,next)=>{
//     try {
//      const user = req.user;
//      if (!user) { return  res.status(400).json({ success: true , message: "user not authenticated"});  
//     }
//     res.json({ success: true , message: "user  authenticated"})

//     } catch (error) {
//         res.status(400).json({ message: "intern server error"});
//     }
// }
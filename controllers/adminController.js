import { Admin } from "../models/adminModel.js";
import { generateUserToken } from "../utils/generativeToken.js";
import bcrypt from 'bcryptjs';
import { cloudinaryInstance } from "../configuration/cloudinary.js";

export const adminCreate = async (req, res, next) => {
    try {       
        const { name, email, password, role,courses } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "all fields required" });
        }

        const adminExist = await Admin.findOne({ email });

        if (adminExist) {
            return res.status(404).json({ success: false, message: "Admin already exist" });
        }

        //hashing
        const salt = 10;
        const hashedPassword = bcrypt.hashSync(password, salt);

        //create new user
        const newAdmin = new Admin({ name, email, password: hashedPassword,role,courses});
        await newAdmin.save();

        //create token
        const token = generateUserToken(email,"Admin");
       // res.cookie("token", token );
       res.cookie('token', token, { 
        secure: true,             
        sameSite: 'None', // If needed for cross-origin requests
        path: '/',
        httpOnly: false // Set to true for security if you don't need access via JS
    });

        res.json({ success: true, message: "Admin created successfully" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};

export const adminLogin = async(req,res,next)=>{
    try {
        const {  email, password  } = req.body;
        if ( !password ||  !email) {
            return res.status(400).json({ success: false , message: "all fields required"});
            
        }
        const userExist = await Admin.findOne({email})
        if (!userExist) { return  res.status(400).json({ success: false , message: "Admin does not exist"});  
         }

         const passwordMatch = bcrypt.compareSync(password, userExist.password);
         if (!passwordMatch) { return  res.status(400).json({ success: false , message: "Admin does not match"});  
        }

        const token = generateUserToken(email,"Admin");
       // res.cookie("token", token );
       res.cookie('token', token, { 
        secure: true,             
        sameSite: 'None', // If needed for cross-origin requests
        path: '/',
        httpOnly: false // Set to true for security if you don't need access via JS
    });

        res.json({ success: true , message: "Admin login succcesfuly" ,data:userExist})

    } catch (error) {
        res.status(500).json({ message: "intern server"});
    }
 };


export const adminProfile = async (req, res, next) => {
    try {
        console.log("test1 admin");
    
        const { id } = req.params;
        const useData = await Admin.findById(id).select("-password");

        res.json({ success: true, message: "Admin data fetched", data: useData });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};

export const adminUpdate = async(req,res,next)=>{
    try {             
         let {name, email, password, profilepic, mobile, courses,role} = req.body;
         const {id} = req.params;
         const salt = 10;
         const hashedpassword = bcrypt.hashSync(password, salt);
         console.log("admin updata backend",req.file);
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
             console.log("admin updata backend2",profilepic);
       const updatedAdmin = await Admin.findByIdAndUpdate(id,{name, email, mobile , profilepic , password: hashedpassword, courses,role},{new:true}); 
          if (!updatedAdmin) {
            return res.status(404).json({ success: false, message: "Instructor not found" });
           }
         res.json({ success: true , message: "Admin updated succcesfuly" , data:updatedAdmin });   
    
        } 
    catch (error) {
        res.status(400).json({ success: false, message: "Admin internal server error"});
    }
};

export const adminDelete = async(req,res,next)=>{
    try {
    
     const {id} = req.params;

      await Admin.findByIdAndDelete(id); 

     res.json({ success: true , message: "Admin deleted succcesfuly" });   

    } catch (error) {
        res.status(400).json({ message: " Admin intern server error"});
    }
};


export const checkAdmin = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(400).json({ success: true, message: "Admin not authenticated" });
        }
        res.json({ success: true, message: "Admin authenticated" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};
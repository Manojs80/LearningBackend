import { Instructor } from "../models/instructorModel.js";
import { generateUserToken } from "../utils/generativeToken.js";
import bcrypt from "bcrypt";
import { cloudinaryInstance } from "../configuration/cloudinary.js";

export const instructorCreate = async (req, res, next) => {
    try {
        console.log("here");
        const { name , email , password , mobile , role, courses } = req.body;
        console.log("instructor create ",req.body )
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "all fields required" });
        }

        const instructorExist = await Instructor.findOne({ email });

        if (instructorExist) {
            return res.status(404).json({ success: false, message: "Instructor already exist" });
        }
   
        
        //hashing
        const salt = 10;
        const hashedPassword = bcrypt.hashSync(password, salt);
        if (!req.file) {
            console.log("image not visible");
            
            //return res.status(400).json({ message: "image not visible" });
             }
           // Upload an image
           const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path).catch((error) => {
            console.log(error);
        });
        console.log(uploadResult);
        //create new user
        const newInstructor = new Instructor({ name, email, password: hashedPassword, mobile , role, courses });
      
        if (uploadResult?.url) {
            newInstructor.profilepic = uploadResult.url;
        } 
        
        
        
        await newInstructor.save();

        //create token
        const token = generateUserToken(email, "Instructor");

        res.cookie("token", token);
        res.json({ success: true, message: "Instructor created successfully" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};

export const instructorLogin = async(req,res,next)=>{
    try {
        const {  email, password  } = req.body;
        if ( !password ||  !email) {
            return res.status(400).json({ success: false , message: "all fields required"});
            
        }
        const userExist = await Instructor.findOne({email})
        if (!userExist) { return  res.status(400).json({ success: false , message: "Instructor does not exist"});  
         }

         const passwordMatch = bcrypt.compareSync(password, userExist.password);
         if (!passwordMatch) { return  res.status(400).json({ success: false , message: "Instructor does not match"});  
        }

        const token = generateUserToken(email,"Instructor");
        res.cookie("token", token );
        res.json({ success: true , message: "Instructor login succcesfuly" , data:userExist })

    } catch (error) {
        res.status(500).json({ message: "intern server"});
    }
 };

export const instructorProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const useData = await Instructor.findById(id).select("-password");

        res.json({ success: true, message: "Intructor data fetched", data: useData });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};

export const instructorUpdate = async(req,res,next)=>{
    try {
     let {name, email, password, profilepic, mobile, courses,role} = req.body;
     const {id} = req.params;
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
      const updatedInstructor = await Instructor.findByIdAndUpdate(id,{name, email, mobile , profilepic , password: hashedpassword, courses,role},{new:true}); 
      if (!updatedInstructor) {
        return res.status(404).json({ success: false, message: "Instructor not found" });
    }
     res.json({ success: true , message: "Instructor updated succcesfuly" , data:updatedInstructor });   

    } catch (error) {
        res.status(400).json({ message: "Instructor internal server error"});
        console.log(error);
        
    }
};

export const ListInstructor = async(req,res,next)=>{
    try {
     const InstructorList = await Instructor.find();
     res.json({ success: true , message: "course fetch succcesfuly" , data:InstructorList});   

    } catch (error) {
        res.status(400).json({ message: "intern server error"});
    }
};

export const instructorDelete = async(req,res,next)=>{
    try {
    
     const {id} = req.params;

      await Instructor.findByIdAndDelete(id); 

     res.json({ success: true , message: "Instructor deleted succcesfuly" });   

    } catch (error) {
        res.status(400).json({ message: "Instructor intern server error"});
    }
};

export const checkInstructor = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(400).json({ success: true, message: "user not authenticated" });
        }
        res.json({ success: true, message: "User authenticated" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};
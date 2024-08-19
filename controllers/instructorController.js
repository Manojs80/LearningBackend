import { Instructor } from "../models/instructorModel.js";
import { generateUserToken } from "../utils/generativeToken.js";
import bcrypt from "bcrypt";

export const instructorCreate = async (req, res, next) => {
    try {
        const { name, email, password, courses } = req.body;
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

        //create new user
        const newInstructor = new Instructor({ name, email, password: hashedPassword, role: "instructor", courses });
        await newInstructor.save();

        //create token
        const token = generateUserToken(email, "instructor");

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

        const token = generateUserToken(email);
        res.cookie("token", token );
        res.json({ success: true , message: "Instructor login succcesfuly"})

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
import { Admin } from "../models/adminModel.js";
import { generateUserToken } from "../utils/generativeToken.js";
import bcrypt from "bcrypt";

export const adminCreate = async (req, res, next) => {
    try {       
        const { name, email, password, courses } = req.body;
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
        const newAdmin = new Admin({ name, email, password: hashedPassword});
        await newAdmin.save();

        //create token
        const token = generateUserToken(email);

        res.cookie("token", token);
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

        const token = generateUserToken(email);
        res.cookie("token", token );
        res.json({ success: true , message: "Admin login succcesfuly"})

    } catch (error) {
        res.status(500).json({ message: "intern server"});
    }
 };


export const adminProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const useData = await Admin.findById(id).select("-password");

        res.json({ success: true, message: "Admin data fetched", data: useData });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
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
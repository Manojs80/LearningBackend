import  jwt  from "jsonwebtoken";
import 'dotenv/config' 

export const authUser =(req,res,next)=>{
    try {
        console.log("Cookies:", req.cookies); 
        const token =  req.cookies.token;
        console.log("req.cookies.token", token);
        
        if (!token) {
           return res.status(400).json({ message: "token not get"});  
        }
       const tokenverify = jwt.verify(token, process.env.jwt_token);
        if (!tokenverify ) {
            return res.status(400).json({ message: "user not authenticated"});  
         }

         if (tokenverify.role !== "User") {
            return res.status(400).json({ message: "User not authenticated" });
        }

         console.log(" tokenverify", tokenverify);
         
         req.user= tokenverify;
        next();
    } catch (error) {
        console.log(error);
        
    }
};
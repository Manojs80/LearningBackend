import jwt from "jsonwebtoken";
import 'dotenv/config'

export const authINAD = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({ success: false, message: " Not Authorised" });
        }

        const tokenVerified = jwt.verify(token, process.env.jwt_token);

        if (!tokenVerified) {
            return res.status(400).json({ success: false, message: "Not Authorised" });
        }  
        if (tokenVerified.role !== "Instructor" && tokenVerified.role !== "Admin") {
            return res.status(400).json({ message: "Instructor/Admin not authenticated" });
        }
        
        req.user = tokenVerified;
        next();

    } catch (error) {
        console.log(error);
    }
};
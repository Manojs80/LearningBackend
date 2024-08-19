import jwt from "jsonwebtoken";
import 'dotenv/config'
export const authInstructor = (req, res, next) => {
    try {
        const { token } = req.cookies;
        console.log(token);

        if (!token) {
            
            
            return res.status(400).json({ success: false, message: "Instructor not authenticated" });
        }

        const tokenVerified = jwt.verify(token,process.env.jwt_token);

        console.log(tokenVerified,"tv");
        if (!tokenVerified) {
            return res.status(400).json({ success: false, message: "user not authenticated(token)" });
        }

        if (tokenVerified.role !== 'instructor' && tokenVerified.role !== 'admin') {
           return res.status(400).json({ message: "instructor/admin not authenticated" });
       }

        req.user = tokenVerified;
        next();
    } catch (error) {
        console.log(error);
    }
};
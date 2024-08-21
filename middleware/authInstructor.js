import jwt from "jsonwebtoken";
import 'dotenv/config'
export const authInstructor = (req, res, next) => {
    try {
        const { token } = req.cookies;
        console.log(token);

        if (!token) {
            
            
            return res.status(400).json({ success: false, message: "Instructor not authenticated" });
        }

        const tokenverify = jwt.verify(token,process.env.jwt_token);

        console.log(tokenverify,"tv");
        if (!tokenverify) {
            return res.status(400).json({ success: false, message: "user not authenticated(token)" });
        }

        if (tokenverify.role !== "Instructor") {
            return res.status(400).json({ message: "Instructor not authenticated" });
        }
        console.log(" tokenverify", tokenverify);
        req.user = tokenverify;
        next();
    } catch (error) {
        console.log(error);
    }
};
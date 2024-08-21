import jwt from "jsonwebtoken";
import 'dotenv/config'

export const authAdmin = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({ success: false, message: "Admin not authenticated" });
        }

        const tokenverify = jwt.verify(token, process.env.jwt_token);

        if (!tokenverify) {
            return res.status(400).json({ success: false, message: "Admin not authenticated" });
        }   
        
        if (tokenverify.role !== "Admin") {
            return res.status(400).json({ message: "user not authenticated" });
        }
        console.log(" tokenverify", tokenverify);
        req.user = tokenverify;
        next();

    } catch (error) {
        console.log(error);
    }
};
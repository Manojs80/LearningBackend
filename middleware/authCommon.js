import jwt from "jsonwebtoken";
import 'dotenv/config'

export const authCommon = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({ success: false, message: " Not Authorised" });
        }

        const tokenVerified = jwt.verify(token, process.env.jwt_token);

        if (!tokenVerified) {
            return res.status(400).json({ success: false, message: "Not Authorised" });
        }   
        console.log(" tokenverified", tokenVerified);
        req.user = tokenVerified;
        next();

    } catch (error) {
        console.log(error);
    }
};
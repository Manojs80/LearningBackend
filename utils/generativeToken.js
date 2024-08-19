import  jwt  from "jsonwebtoken";
import 'dotenv/config' 


export const generateUserToken =(email,role)=>{
    console.log(process.env.jwt_token);
    
    const token = jwt.sign({ email: email,role: role }, process.env.jwt_token);
    return token;
};
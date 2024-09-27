import { generateUserToken } from "../utils/generativeToken.js";

export const logout = async (req, res, next) => {
  
  try {
        console.log("logout123",req.body);
        const email = req.body
        const token = generateUserToken(email,"notuser");
        console.log("userlogout token",token);
        res.cookie('token', token, { 
        secure: true,             
        sameSite: 'None',
        path: '/',
        httpOnly: false 
          }); 
        console.log("logout2");
        res.status(200).json({ success: true, message: 'Logged out successfully' });
      } 
  catch (error) {
        res.status(500).json({ success: false, message: 'Error during logout' });
    }
  };







//     console.log("logout token",token); 
//     res.cookie('token', token, { 
//       secure: true,             
//       sameSite: 'None', // If needed for cross-origin requests
//       path: '/',
//       httpOnly: false // Set to true for security if you don't need access via JS
//     });

// export const logout = async(req,res,next)=>{
//     try {
//         console.log("logout");
        
//         // Clear the cookie by setting it with an expired date
//         res.cookie('token', '', { expires: new Date(0), httpOnly: true, sameSite: 'Strict' });
    
//         // Optionally, you can also handle any server-side session invalidation here
    
//         res.status(200).json({ success: true, message: 'Logged out successfully' });
//       } catch (error) {
//         res.status(500).json({ success: false, message: 'Error during logout' });
//       }
// };
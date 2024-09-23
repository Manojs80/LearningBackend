
export const logout = async (req, res, next) => {
  try {
    console.log("logout");
   
    res.clearCookie('token', { 
      path: '/',           // Ensure the path matches
      secure: true,       // Include secure if it was set that way
      sameSite: 'None'    // Include sameSite if it was set that way
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error during logout' });
  }
};







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
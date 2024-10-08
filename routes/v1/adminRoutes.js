import express from "express";
import { authAdmin } from "../../middleware/authAdmin.js";
//import { Instructor } from "../../models/instructorModel.js";
//import { course } from "../../models/courseModel.js";
import { adminCreate, adminDelete, adminLogin, adminProfile, adminUpdate, checkAdmin } from "../../controllers/adminController.js";
import { upload } from "../../middleware/middlewareUpload.js";



const router = express.Router();

router.post("/create", adminCreate);
router.post("/login",adminLogin);
router.get("/profile/:id", adminProfile);
router.put("/update/:id",upload.single("profilepic") , adminUpdate)
router.delete("/delete/:id", authAdmin , adminDelete)
router.get("/check-admin", authAdmin, checkAdmin);


// router.delete('/course/:courseId/:id', authAdmin, async(req,res,next)=>{

// try {
//     const {id, courseId}= req.params;
    

//     const admin = await Instructor.findById(id);
//     //error 

//     const deleteCourse = await course.findByIdAndDelete(courseId);
//     if(!deleteCourse){
//         //cfdhsklf
//     }

//     res.send('course deleted successfully')


// } catch (error) {
//     console.log(error);
    
    
// }


// })


export default router;
//, authAdmin
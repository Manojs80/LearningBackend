import { cloudinaryInstance } from "../configuration/cloudinary.js";
import { course } from "../models/courseModel.js";
import { Instructor } from "../models/instructorModel.js";

export const getCourseList = async(req,res,next)=>{
    try {
     const courseList = await course.find();
     res.json({ success: true , message: "course fetch succcesfuly" , data:courseList});   

    } catch (error) {
        res.status(400).json({ message: "intern server error"});
    }
};

export const getCourse = async(req,res,next)=>{
    try {
        const {id} = req.params;
     const CourseGet = await course.findById(id);
      res.json({ success: true , message: "Coursefetch succcesfuly" , data:CoursenGet});   
 
     } catch (error) {
        res.status(400).json({ message: "Course server error"});
     }
 };

export const createCourse = async(req,res,next)=>{
    try {
       const {title,description,duration} = req.body;
      
       const user=req.user;
       let currentInstructor;
       if(user.role==='instructor'){
         currentInstructor = await Instructor.findOne({email:user.email});
       }
       
       if (!req.file) {
        return res.status(400).json({ message: "image not visible" });
         }

       const existCourse = await course.findOne({ title: title });

       if (existCourse) {
        return res.status(400).json({ message: "course already exist" });
        }

       // Upload an image
        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path).catch((error) => {
            console.log(error);
        });

         console.log(uploadResult);

        const newCourse = new course({ title, description, duration });
        if (uploadResult?.url) {
            newCourse.image = uploadResult.url;
        }        
        if (currentInstructor) {
            console.log(currentInstructor);
           newCourse.instructor = currentInstructor; 
        } 
         await newCourse.save();

     res.json({ success: true , message: "course create succcesfuly" , data:newCourse});   

    } catch (error) {
        console.log(error);
        
        res.status(400).json({ message: " course intern server  error"});
    }
};

export const updateCourse = async(req,res,next)=>{
    try {
     const {title,desc,image,duration,insructor} = req.body;
     const {id} = req.params;

      const updatedCourse = await course.findByIdAndUpdate(id,{title,desc,image,duration,insructor},{new:true}); 

     res.json({ success: true , message: "course updated succcesfuly" , data:updatedCourse });   

    } catch (error) {
        res.status(400).json({ message: "intern server error"});
    }
};

export const deleteCourse = async(req,res,next)=>{
    try {
    
     const {id} = req.params;

      await course.findByIdAndDelete(id); 

     res.json({ success: true , message: "course deleted succcesfuly" });   

    } catch (error) {
        res.status(400).json({ message: "intern server error"});
    }
};
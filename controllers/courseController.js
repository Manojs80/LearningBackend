import { cloudinaryInstance } from "../configuration/cloudinary.js";
import { course } from "../models/courseModel.js";

export const getCourseList = async(req,res,next)=>{
    try {
     const courseList = await course.find();
     res.json({ success: true , message: "course fetch succcesfuly" , data:courseList});   

    } catch (error) {
        res.status(400).json({ message: "intern server error"});
    }
};

export const createCourse = async(req,res,next)=>{
    try {
       const {title,desc,duration,instructor} = req.body;
       
       if (!req.file) {
        return res.status(400).json({ message: "image not visible" });
         }

       const Course = await course.findOne({ title: title });

       if (Course) {
        return res.status(400).json({ message: "course already exist" });
        }

       // Upload an image
        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path).catch((error) => {
            console.log(error);
        });

         console.log(uploadResult);

        const newCourse = new course({ title, desc, duration, instructor });
        if (uploadResult?.url) {
            newCourse.image = uploadResult.url;
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
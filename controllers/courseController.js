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

export const getCourseListId = async(req,res,next)=>{
    try {  
        const {id} = req.params;
        console.log("getCourseListId ",id);
        console.log("test1",{instructor:id});
     const courseList = await course.find({instructor:id});
     res.json({ success: true , message: "course fetch succcesfuly" , data:courseList});   
     console.log("getCourseListId courseList ",courseList);
    } catch (error) {
        res.status(400).json({ message: "intern server error"});
    }
};
export const getCourse = async(req,res,next)=>{
    try {
        const {id} = req.params;
     const CourseGet = await course.findById(id);
      res.json({ success: true , message: "Coursefetch succcesfuly" , data:CourseGet});   
 
     } catch (error) {
        res.status(400).json({ message: "Course server error"});
     }
 };

export const createCourse = async(req,res,next)=>{
    try {
       const {title,description,duration,objectives,image,instructor} = req.body;
      
       
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

        const newCourse = new course({ title,description,duration,objectives,image,instructor });
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
     const {title,description,image,objectives,duration,insructor} = req.body;
     console.log("  Course update 1",req.body)
     const {id} = req.params;
     let imageUrl = undefined;
     if (req.file) {
        try {
          const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
          imageUrl = uploadResult.url;  // Set image URL from upload result
          console.log("Image URL:", imageUrl);
        } catch (error) {
          console.log("Image upload error:", error);
          return res.status(500).json({ success: false, message: "Image upload failed" });
        }
      }
      const updatedCourse = await course.findByIdAndUpdate(id,{title,description,objectives,image: imageUrl,duration,insructor},{new:true}); 
      if (!updatedCourse) {
        return res.status(404).json({ success: false, message: "Course not found" });
    }

     res.json({ success: true , message: "course updated succcesfuly" , data:updatedCourse });   
     console.log(" message: Course updated succcesfuly",updatedCourse)
    } catch (error) {
        res.status(400).json({ message: "internal server error"});
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
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
     const CourseGet = await course.findById(id).populate('instructor');
      res.json({ success: true , message: "Coursefetch succcesfuly" , data:CourseGet});   
 
     } catch (error) {
        res.status(400).json({ message: "Course server error"});
     }
 };

 export const createCourse = async (req, res, next) => {
    try {
        const { title, description, duration, objectives, fee, instructor } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image not provided" });
        }

        const existCourse = await course.findOne({ title });

        if (existCourse) {
            return res.status(400).json({ message: "Course already exists" });
        }

        // Upload an image
        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path).catch((error) => {
            console.log(error);
            throw new Error("Image upload failed");
        });

        const newCourse = new course({
            title,
            description,
            fee,
            duration,
            objectives,
            image: uploadResult?.url || '', // Set image directly from uploadResult
            instructor
        });

        await newCourse.save();

        // Update the instructor's courses array
        const updatedInstructor = await Instructor.findByIdAndUpdate(
            instructor,
            { $addToSet: { courses: newCourse._id } }, // Add course ID to array
            { new: true }
        );

        if (!updatedInstructor) {
            return res.status(404).json({ success: false, message: "Instructor not found" });
        }

        console.log("Instructor updated successfully", updatedInstructor);

        // Send the response after all operations
        res.json({ success: true, message: "Course created successfully", data: newCourse });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const updateCourse = async(req,res,next)=>{
    try {
     const {title,description,image,objectives,fee,duration,insructor} = req.body;
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
      const updatedCourse = await course.findByIdAndUpdate(id,{title,description,fee,objectives,image: imageUrl,duration,insructor},{new:true}); 
      if (!updatedCourse) {
        return res.status(404).json({ success: false, message: "Course not found" });
    }

     res.json({ success: true , message: "course updated succcesfuly" , data:updatedCourse });   
     console.log(" message: Course updated succcesfuly",updatedCourse)
    } catch (error) {
        res.status(400).json({ message: "internal server error"});
    }
};

export const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const courseToDelete = await course.findById(id);
        
        if (!courseToDelete) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const instructorId = courseToDelete.instructor;
        await course.findByIdAndDelete(id);
        
        const updatedInstructor = await Instructor.findByIdAndUpdate(
            instructorId,
            { $pull: { courses: id } }, // Use $pull to remove course ID from array
            { new: true } // Return the updated document
        );

        if (!updatedInstructor) {
            return res.status(404).json({ success: false, message: "Instructor not found" });
        }

        console.log("User updated successfully", updatedInstructor);
        res.json({ success: true, message: "Course deleted successfully", data: updatedInstructor });

    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

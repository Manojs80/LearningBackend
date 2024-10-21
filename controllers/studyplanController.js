
import { Studyplan } from "../models/studyplanModel.js";

export const getStudyplan = async(req,res,next)=>{
   try {
    const {id} = req.params;
    const gStudyplan = await Studyplan.findOne({ courseId:id });
     res.json({ success: true , message: "Submission fetch succcesfuly" , data:gStudyplan});   

    } catch (error) {
       res.status(400).json({ message: " Studyplan intern server error"});
    }
};


export const createStudyplan = async (req, res) => {
    try {
      const { courseId, activities, instructor } = req.body;
      
      const existStudyplan = await Studyplan.findOne({ courseId });
      if (existStudyplan) {
        return res.status(400).json({ message: "Studyplan already exists" });
      }
  
  
  
      // Create the new study plan
      const newStudyplan = new Studyplan({ courseId, activities, instructor });
      await newStudyplan.save();
  
      res.json({ success: true, message: "Studyplan created successfully", data: newStudyplan });
    } catch (error) {
        console.error("Error updating study plan:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  



 
  export const updateStudyplan = async (req, res) => {
      try {
        console.log("updateStudyplan");
        
          const { courseId, activities, instructor } = req.body;
          const { id } = req.params;
  
          if (!courseId || !activities || !instructor) {
              return res.status(400).json({ message: "Missing required fields" });
          }
         
          const hasValidActivities = activities.every(activity => activity.videoUrl);
            if (!hasValidActivities) {
            return res.status(400).json({ message: "All activities must include a valid videoUrl" });
             }
        
  
          // Update the study plan in the database
          const updatedStudyplan = await Studyplan.findByIdAndUpdate(id, { courseId, activities, instructor }, { new: true, runValidators: true });
  
          if (!updatedStudyplan) {
              return res.status(404).json({ message: "Study plan not found" });
          }
  
          res.json({ success: true, message: "Studyplan updated successfully", data: updatedStudyplan });
      } catch (error) {
          console.error("Error updating study plan:", error);
          res.status(500).json({ message: "Studyplan internal server error" });
      }
  };
  


export const deleteStudyplan = async(req,res,next)=>{
    try {
   
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({ message: "Missing courseId" });
    }

     await Studyplan.deleteOne({ courseId:id });

     res.json({ success: true , message: "Studyplan deleted succcesfuly" });   

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: " Studyplan internal server error"});
    }
};




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



export const createStudyplan = async(req,res,next)=>{
    try {
       const {courseId,activities,instructor} = req.body;
        console.log("createStudyPlan",req.body);
        
       const existStudyplan = await Studyplan.findOne({ courseId });

       if (existStudyplan) {
        return res.status(400).json({ message: "Studyplan already exist" });
        }

       const newStudyplan = new Studyplan({courseId ,activities,instructor }); 
       await newStudyplan.save();

     res.json({ success: true , message: "Studyplancreate succcesfuly" , data:newStudyplan});   

    } catch (error) {
        console.log(error);
       
        res.status(400).json({ message: "Studyplan internal server  error"});
    }
};



export const updateStudyplan = async(req,res,next)=>{
    try {
     const {courseId,activities,instructor} = req.body;
     const {id} = req.params;

     console.log(activities);
     
     // Validate input
    if (!courseId || !activities || !instructor) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const updatedStudyplan = await Studyplan.findByIdAndUpdate(id,{courseId,activities,instructor},{new:true,runValidators: true}); 

      if (!updatedStudyplan) {
        return res.status(404).json({ message: "Study plan not found" });
      }

     res.json({ success: true , message: "Studyplan updated succcesfuly" , data:updatedStudyplan });   

   } catch (error) {
        res.status(500).json({ message: "Studyplan internal server error"});
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



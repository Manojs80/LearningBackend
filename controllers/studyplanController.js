
import { Studyplan } from "../models/studyplanModel.js";

export const getStudyplan = async(req,res,next)=>{
   try {
    const {id} = req.params;
    const gStudyplan = await Studyplan.findById(id);
     res.json({ success: true , message: "Submission fetch succcesfuly" , data:gStudyplan});   

    } catch (error) {
       res.status(400).json({ message: " Studyplan intern server error"});
    }
};



export const createStudyplan = async(req,res,next)=>{
    try {
       const {course,activities,user,instructor} = req.body;
      
       const existStudyplan = await Studyplan.findOne({ course: course });

       if (existStudyplan) {
        return res.status(400).json({ message: "Studyplan already exist" });
        }

       const newStudyplan = new Studyplan({course,activities,user,instructor }); 
       await newStudyplan.save();

     res.json({ success: true , message: "Studyplancreate succcesfuly" , data:newStudyplan});   

    } catch (error) {
        console.log(error);
       
        res.status(400).json({ message: "Studyplan intern server  error"});
    }
};



export const updateStudyplan = async(req,res,next)=>{
    try {
     const {course,activities,user,instructor} = req.body;
     const {id} = req.params;

      const updatedStudyplan = await Studyplan.findByIdAndUpdate(id,{course,activities,user,instructor},{new:true}); 

     res.json({ success: true , message: "Assignment updated succcesfuly" , data:updatedStudyplan });   

   } catch (error) {
        res.status(400).json({ message: "Studyplan intern server error"});
    }
};


export const deleteStudyplan = async(req,res,next)=>{
    try {
   
    const {id} = req.params;

      await Studyplan.findByIdAndDelete(id); 

     res.json({ success: true , message: "Studyplan deleted succcesfuly" });   

    } catch (error) {
        res.status(400).json({ message: " Studyplan intern server error"});
    }
};



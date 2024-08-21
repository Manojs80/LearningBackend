import { Submission } from "../models/submissionModel.js";

export const getSubmissionList = async(req,res,next)=>{
   try {
    const SubmissionList = await Submission.find();
     res.json({ success: true , message: "Submission fetch succcesfuly" , data:SubmissionList});   

    } catch (error) {
       res.status(400).json({ message: "intern server error"});
    }
};

export const getSubmission = async(req,res,next)=>{
    try {
        const {id} = req.params;
     const SubmissionGet = await Submission.findById(id);
      res.json({ success: true , message: "Submission fetch succcesfuly" , data:SubmissionGet});   
 
     } catch (error) {
        res.status(400).json({ message: "Submission intern server error"});
     }
 };


export const createSubmission = async(req,res,next)=>{
    try {
       const {student,assignment,submissionDate,content,grade,instructor,course} = req.body;
      
       const existSubmission = await Submission.findOne({ student: student });

       if (existSubmission) {
        return res.status(400).json({ message: "submitt already exist" });
        }

       const newSubmission = new Submission({ student,assignment,submissionDate,content,grade,instructor,course }); 
       await newSubmission.save();

     res.json({ success: true , message: "Submission create succcesfuly" , data:newSubmission});   

    } catch (error) {
        console.log(error);
       
        res.status(400).json({ message: "Submission intern server  error"});
    }
};



export const updateSubmission = async(req,res,next)=>{
    try {
     const {student,assignment,submissionDate,content,grade,instructor,course} = req.body;
     const {id} = req.params;

      const updatedSubmission = await Submission.findByIdAndUpdate(id,{student,assignment,submissionDate,content,grade,instructor,course},{new:true}); 

     res.json({ success: true , message: "Assignment updated succcesfuly" , data:updatedSubmission });   

   } catch (error) {
        res.status(400).json({ message: "intern server error"});
    }
};


export const deleteSubmission = async(req,res,next)=>{
    try {
   
    const {id} = req.params;

      await Submission.findByIdAndDelete(id); 

     res.json({ success: true , message: "Submission deleted succcesfuly" });   

    } catch (error) {
        res.status(400).json({ message: "intern server error"});
    }
};
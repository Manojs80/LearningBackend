import { Assignment } from "../models/assignmentModel.js";
import { Submission } from "../models/submissionModel.js";

export const getSubmissionList = async(req,res,next)=>{
   try {
    const {id} = req.params;
    console.log("test1",{course:id}); 
    const SubmissionList = await Submission.find({ course: id }).populate('student');
    // .populate('student') // Populate student details
    // .populate('instructor'); // Populate instructor detail
     res.json({ success: true , message: "Submission fetch succcesfuly" , data:SubmissionList});   

    } catch (error) {
       res.status(400).json({ message: "internal server error"});
    }
};

export const getSubmission = async(req,res,next)=>{
    try {
        const {id} = req.params;
     const SubmissionGet = await Submission.find({student:id});
      res.json({ success: true , message: "Submission fetch succcesfuly" , data:SubmissionGet});   
 
     } catch (error) {
        res.status(400).json({ message: "Submission intern server error"});
     }
 };


export const createSubmission = async(req,res,next)=>{
    try {
        console.log("createSubmission",req.body);
        
       const {LearnerId,courseId,task,url} = req.body;

       const AssignmentGet = await Assignment.findOne({course:courseId});
       console.log("createSubmission AssignmentGet",AssignmentGet);
       if (!AssignmentGet) {
        return res.status(400).json({ message: "Assignment not found for this course." });
    }
    
    const existSubmission = await Submission.findOne({ student: LearnerId, task: task });

       if (existSubmission) {
        return res.status(400).json({ message: "submitt already exist" });
        }

       const newSubmission = new Submission({
         student:LearnerId,
         assignment:AssignmentGet._id,
         instructor:AssignmentGet.instructor,
         course:courseId,content:url,task:task }); 
       await newSubmission.save();

     res.json({ success: true , message: "Submission create succcesfuly" , data:newSubmission}); 
    
    // res.json({ success: true , message: "Submission create succcesfuly" });

    } catch (error) {
        console.log(error);
       
        res.status(400).json({ message: "Submission intern server  error"});
    }
};



export const updateSubmission = async(req,res,next)=>{
    try {
     const {score} = req.body;
     const {url} = req.body;
     const {id} = req.params;
     console.log("updateSubmission",req.body);
     

      const updatedSubmission = await Submission.findByIdAndUpdate(id,{ score: score, content: url },{new:true}); 

     res.json({ success: true , message: "Submission updated succcesfuly" , data:updatedSubmission });   

   } catch (error) {
        res.status(400).json({ message: "intern server error"});
    }
};
//LearnerUpdateSubmission
export const LearnerUpdateSubmission = async(req,res,next)=>{
    try {
     const {score} = req.body;
     const {url} = req.body;
     const {id} = req.params;

      const updatedSubmission = await Submission.findByIdAndUpdate(id,{ score: score },{content:url},{new:true}); 

     res.json({ success: true , message: "Submission updated succcesfuly" , data:updatedSubmission });   

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

 import { Assignment } from "../models/assignmentModel.js";

 export const getAssignmentList = async(req,res,next)=>{
    try {
        const {id} = req.params;
        console.log("test1",{course:id}); 
     const AssignmentList = await Assignment.find({course:id});
     console.log("test2",AssignmentList);

   
      res.json({ success: true , message: "Assignment fetch succcesfuly" , data:AssignmentList});   

     } catch (error) {
        res.status(400).json({ message: "intern server error"});
     }
};

export const getAssignment = async(req,res,next)=>{
    try {
         
        const {id} = req.params;
        console.log("reach assignment controller",id);

     const AssignmentGet = await Assignment.find({course:id});
      res.json({ success: true , message: "Assignment fetch succcesfuly" , data:AssignmentGet});   
 
     } catch (error) {
        res.status(400).json({ message: "Assignment intern server error"});
     }
 };

 export const createAssignment = async(req,res,next)=>{
     try {
        console.log("test1");
        const {course,activities,instructor} = req.body;
       
        console.log("test2",req.body);
        // const existAssignment = await Assignment.findOne({ course });

        // if (existAssignment) {
        //  return res.status(400).json({ message: "Assignment already exist" });
        //  }
         
       
        const newAssignment = new Assignment({course,activities,instructor}); 
        await newAssignment.save();
        console.log("test3");
      res.json({ success: true , message: "Assignment create succcesfuly" , data:newAssignment});   

     } catch (error) {
         console.log(error);
        
         res.status(400).json({ message: "Assignment intern server  error"});
     }
 };

 export const updateAssignment = async(req,res,next)=>{
    try {
     const {course,activities,instructor} = req.body;
     const {id} = req.params;

     console.log(activities);
     
     // Validate input
    if (!course || !activities || !instructor) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const updatedAssignment = await Assignment.findOneAndUpdate(  { course: id },{activities,instructor},{new:true,runValidators: true}); 

      if (!updatedAssignment) {
        return res.status(404).json({ message: "Assignment plan not found" });
      }

     res.json({ success: true , message: "Assignment updated succcesfuly" , data:updatedAssignment });   

   } catch (error) {
        res.status(500).json({ message: "Assignment internal server error"});
    }
};

 export const deleteAssignment = async(req,res,next)=>{
     try {
    
     const {id} = req.params;
     console.log("delete assignment",id);
     
    
    if (!id) {
        return res.status(400).json({ message: "Missing courseId" });
    }

     await  Assignment.deleteOne({ course:id });

      res.json({ success: true , message: "Assignment deleted succcesfuly" });   

     } catch (error) {
         res.status(400).json({ message: "internal server error"});
     }
 };
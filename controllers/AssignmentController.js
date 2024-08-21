
 import { Assignment } from "../models/assignmentModel.js";

 export const getAssignmentList = async(req,res,next)=>{
    try {
     const AssignmentList = await Assignment.find();
      res.json({ success: true , message: "Assignment fetch succcesfuly" , data:AssignmentList});   

     } catch (error) {
        res.status(400).json({ message: "intern server error"});
     }
};

export const getAssignment = async(req,res,next)=>{
    try {
        const {id} = req.params;
     const AssignmentGet = await Assignment.findById(id);
      res.json({ success: true , message: "Assignment fetch succcesfuly" , data:AssignmentGet});   
 
     } catch (error) {
        res.status(400).json({ message: "Assignment intern server error"});
     }
 };

 export const createAssignment = async(req,res,next)=>{
     try {
        const {title,description,duedate,instructor,course} = req.body;
       
        
        const existAssignment = await Assignment.findOne({ title: title });

        if (existAssignment) {
         return res.status(400).json({ message: "Assignment already exist" });
         }
         
       
        const newAssignment = new Assignment({ title,description,duedate,instructor,course }); 
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
      const {title,description,duedate,instructor,course} = req.body;
      const {id} = req.params;

       const updatedAssignment = await Assignment.findByIdAndUpdate(id,{title,description,duedate,instructor,course},{new:true}); 

      res.json({ success: true , message: "Assignment updated succcesfuly" , data:updatedAssignment });   

    } catch (error) {
         res.status(400).json({ message: "intern server error"});
     }
 };

 export const deleteAssignment = async(req,res,next)=>{
     try {
    
     const {id} = req.params;

       await Assignment.findByIdAndDelete(id); 

      res.json({ success: true , message: "Assignment deleted succcesfuly" });   

     } catch (error) {
         res.status(400).json({ message: "intern server error"});
     }
 };
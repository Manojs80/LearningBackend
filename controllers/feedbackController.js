import { Feedback } from "../models/feedbackModel.js";

export const getFeedbackList = async(req,res,next)=>{
   try {
    const FeedbackList = await Feedback.find();
     res.json({ success: true , message: "Submission fetch succcesfuly" , data:FeedbackList});   

    } catch (error) {
       res.status(400).json({ message: "intern server error"});
    }
};

export const getFeedback = async(req,res,next)=>{
    try {
        const {id} = req.params;
     const FeedbackGet = await Feedback.findById(id);
      res.json({ success: true , message: "Submission fetch succcesfuly" , data:FeedbackGet});   
 
     } catch (error) {
        res.status(400).json({ message: "intern server error"});
     }
 };

export const createFeedback = async(req,res,next)=>{
    try {
       const {name,instructor,message,course} = req.body;
      
       const newFeedback = new Feedback({name,instructor,message,course}); 
       await newFeedback.save();

     res.json({ success: true , message: "Feedback Submission succcesfuly" , data:newFeedback});   

    } catch (error) {
        console.log(error);
       
        res.status(400).json({ message: "Submission intern server  error"});
    }
};


export const deleteFeedback = async(req,res,next)=>{
    try {
   
    const {id} = req.params;

      await Feedback.findByIdAndDelete(id); 

     res.json({ success: true , message: "Feedback deleted succcesfuly" });   

    } catch (error) {
        res.status(400).json({ message: "intern server error"});
    }
};
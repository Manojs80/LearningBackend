import { Quiz } from "../models/quizModel.js";

 export const getQuizList = async(req,res,next)=>{
    try {
     const QuizList = await Quiz.find();
      res.json({ success: true , message: "Quiz fetch succcesfuly" , data:QuizList});   

     } catch (error) {
        res.status(400).json({ message: "intern server error"});
     }
};


 export const createQuiz = async(req,res,next)=>{
     try {
        const {title,description,createdAt,questions,correctAnswerIndex,instructor,course} = req.body;
       


        const Quiz = await Quiz.findOne({ title: title });

        if (Quiz) {
         return res.status(400).json({ message: "Quiz already exist" });
         }

       
        const newQuiz = new Quiz({title,description,createdAt,questions,correctAnswerIndex,instructor,course }); 
        await newQuiz.save();

      res.json({ success: true , message: "Quiz create succcesfuly" , data:newQuiz});   

     } catch (error) {
         console.log(error);
        
         res.status(400).json({ message: "Quiz intern server  error"});
     }
 };

 export const updateQuiz = async(req,res,next)=>{
     try {
      const {title,description,createdAt,questions,correctAnswerIndex,instructor,course} = req.body;
      const {id} = req.params;

       const updatedQuiz = await Quiz.findByIdAndUpdate(id,{title,description,createdAt,questions,correctAnswerIndex,instructor,course},{new:true}); 

      res.json({ success: true , message: "Quiz updated succcesfuly" , data:updatedQuiz });   

    } catch (error) {
         res.status(400).json({ message: "intern server error"});
     }
 };

 export const deleteQuiz = async(req,res,next)=>{
     try {
    
     const {id} = req.params;

       await Quiz.findByIdAndDelete(id); 

      res.json({ success: true , message: "Quiz deleted succcesfuly" });   

     } catch (error) {
         res.status(400).json({ message: "intern server error"});
     }
 };
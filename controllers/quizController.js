import { Quiz } from "../models/quizModel.js";

 export const getQuizList = async(req,res,next)=>{
    try {
     const QuizList = await Quiz.find();
      res.json({ success: true , message: "Quiz fetch succcesfuly" , data:QuizList});   

     } catch (error) {
        res.status(400).json({ message: "intern server error"});
     }
};

 export const getQuizId = async(req,res,next)=>{
     try {
         const {id} = req.params;
      const existQuizId = await Quiz.find(id);
         if (!existQuizId) {
           return res.status(404).send('Quiz not found');
         }
      res.json({ success: true , message: "Quiz fetch succcesfuly" , data:existQuizId});   

     } catch (error) {
        res.status(400).json({ message: "intern server error"});
     }
 };

 export const createQuiz = async(req,res,next)=>{
     try {
        const {title,description,questions,instructor,course} = req.body;
   
        const existingQuiz = await Quiz.findOne({ title: title });

        if (existingQuiz) {
         return res.status(400).json({ message: "Quiz already exist" });
         }

       
        const newQuiz = new Quiz({title,description,questions,instructor,course }); 
        await newQuiz.save();

      res.json({ success: true , message: "Quiz create succcesfuly" , data:newQuiz});   

     } catch (error) {
         console.log(error);
        
         res.status(400).json({ message: "Quiz intern server  error"});
     }
 };

export const submitQuiz = async(req,res,next)=>{
     try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
         return res.status(404).send('Quiz not found');
        }

         const answers = req.body.answers; // Example: { "questionId1": 2, "questionId2": 0 }
         let score = 0;

    quiz.questions.forEach((question, index) => {
      const userAnswerIndex = answers[question._id];
      if (userAnswerIndex !== undefined && userAnswerIndex === question.correctAnswerIndex) {
        score++;
      }
    });

    res.send({ score, total: quiz.questions.length });
  } catch (error) {
    res.status(500).send('Error submitting answers: ' + error.message);
  }
 };

 export const updateQuiz = async(req,res,next)=>{
     try {
      const {title,description,questions,instructor,course} = req.body;
      const {id} = req.params;

       const updatedQuiz = await Quiz.findByIdAndUpdate(id,{title,description,questions,instructor,course},{new:true}); 

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
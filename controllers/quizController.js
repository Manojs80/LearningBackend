import { Quiz } from "../models/quizModel.js";
import { QuizResponse } from "../models/quizResponseModel.js";

 export const getQuizList = async(req,res,next)=>{
    try {
      const {id} = req.params;
     const QuizList = await Quiz.find({course:id});
     
     if (!QuizList || QuizList.length === 0) {
      return res.status(404).json({ success: false, message: 'No quizzes found for this course' });
    }

      res.json({ success: true , message: "Quiz fetch succcesfuly" , data:QuizList});   

     } catch (error) {
        res.status(400).json({ message: "intern server error"});
     }
};
// const QuizList = await Quiz.findOne({course:id});
// const {id} = req.params;
 export const getQuizId = async(req,res,next)=>{
     try {
      console.log("test-1");    
         const {id} = req.params;
         console.log("test-1",id); 
      const existQuizId = await Quiz.findById(id);
      console.log("test-2");
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
       console.log("createquiz",req.body);
       
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

 export const submitQuiz = async (req, res, next) => {
  try {
    console.log("submit backend 1");
    
    const { userId, quizId, responses } = req.body;

    // Validate the input
    if (!userId || !quizId || !Array.isArray(responses)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Fetch the quiz
    const quiz = await Quiz.findById(quizId).exec();
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate the score
    let score = 0;
    responses.forEach(response => {
      const question = quiz.questions.find(q => q._id.toString() === response.questionId);
      if (question) {
        const answer = question.answers.find(ans => ans._id.toString() === response.answerId);
        if (answer && answer.isCorrect) {
          score += 1;
        }
      }
    });

    // Save the responses
    const newResponse = new QuizResponse({
      userId,
      quizId,
      responses,
      score
    });
    await newResponse.save();
    console.log("submit backend 2",score);
    // Respond with the score
    res.json({ score });
  } catch (err) {
    console.error('Error submitting responses:', err);
    res.status(500).json({ message: 'Failed to submit responses' });
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
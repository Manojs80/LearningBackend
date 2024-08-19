import express from 'express'
import { createQuiz, deleteQuiz, getQuizList, updateQuiz } from '../../controllers/quizController.js'


 const router = express.Router()

 router.get("/QuizList", getQuizList)
 router.post("/create",createQuiz)
 router.put("/update/:id", updateQuiz)
 router.delete("/delete/:id", deleteQuiz)

 export default router
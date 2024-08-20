import express from 'express'
import { createQuiz, deleteQuiz, getQuizId, getQuizList, submitQuiz, updateQuiz } from '../../controllers/quizController.js'


 const router = express.Router()

 router.get("/quizList", getQuizList)
  router.get("/Quiz/:id", getQuizId)
 router.post("/create",createQuiz)
 router.post("/quiz/:id/submit",submitQuiz)
 router.put("/update/:id", updateQuiz)
 router.delete("/delete/:id", deleteQuiz)

 export default router
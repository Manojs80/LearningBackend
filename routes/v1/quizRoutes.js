import express from 'express'
import { createQuiz, deleteQuiz, getQuizId, getQuizList, submitQuiz, updateQuiz } from '../../controllers/quizController.js'
import { authINAD } from '../../middleware/authIN-AD.js'
import { authUser } from '../../middleware/authUser.js'
import { authCommon } from '../../middleware/authCommon.js'
import { authAdmin } from '../../middleware/authAdmin.js'


 const router = express.Router()

 router.get("/quizList",authINAD, getQuizList)
  router.get("/Quiz/:id",authCommon, getQuizId)
 router.post("/create",authINAD,createQuiz)
 router.post("/quiz/:id/submit",authUser,submitQuiz)
 router.put("/update/:id",authINAD ,updateQuiz)
 router.delete("/delete/:id",authAdmin, deleteQuiz)

 export default router
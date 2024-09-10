import express from 'express'
import { createQuiz, deleteQuiz, getQuizId, getQuizList, submitQuiz, updateQuiz } from '../../controllers/quizController.js'
// import { authINAD } from '../../middleware/authIN-AD.js'
// import { authUser } from '../../middleware/authUser.js'
// import { authCommon } from '../../middleware/authCommon.js'
// import { authAdmin } from '../../middleware/authAdmin.js'


 const router = express.Router()

 router.get("/quizList/:id", getQuizList)
  router.get("/getQuiz/:id", getQuizId)
 router.post("/create",createQuiz)
 router.post("/submit",submitQuiz)
 router.put("/update/:id" ,updateQuiz)
 router.delete("/delete/:id", deleteQuiz)

 export default router

 //authINAD,,authCommon,,authINAD,authUser,authINAD,authAdmin

import express from 'express'
import { createFeedback, deleteFeedback, getFeedback, getFeedbackList, updateFeedback } from "../../controllers/feedbackController.js"
import { authAdmin } from '../../middleware/authAdmin.js'
import { authINAD } from '../../middleware/authIN-AD.js'
import { authUser } from '../../middleware/authUser.js'


 const router = express.Router()

 router.get("/feedbackList",authINAD, getFeedbackList )
 router.get("/:id", authINAD,getFeedback )
 router.post("/post",authUser,createFeedback)
 router.put("/update/:id",authUser, updateFeedback )
 router.delete("/delete/:id",authAdmin, deleteFeedback)

 export default router
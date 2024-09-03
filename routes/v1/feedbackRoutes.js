
import express from 'express'
import { createFeedback, deleteFeedback, getFeedback, getFeedbackList} from "../../controllers/feedbackController.js"
// import { authAdmin } from '../../middleware/authAdmin.js'
// import { authINAD } from '../../middleware/authIN-AD.js'
// import { authUser } from '../../middleware/authUser.js'


 const router = express.Router()

 router.get("/feedbackList", getFeedbackList )
 router.get("/get/:id",getFeedback )
 router.post("/create",createFeedback)
 router.delete("/delete/:id", deleteFeedback)

 export default router

 //,authINAD ,, authINAD,,authUser,authAdmin
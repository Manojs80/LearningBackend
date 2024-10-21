import express from 'express'
import { createSubmission, deleteSubmission, getSubmission, getSubmissionList, updateSubmission } from '../../controllers/submissionController.js'
import { authINAD } from '../../middleware/authIN-AD.js'
import { authCommon } from '../../middleware/authCommon.js'
import { authUser } from '../../middleware/authUser.js'



 const router = express.Router()

 router.get("/submissionList/:id",getSubmissionList )
 router.get("/:id",getSubmission )
 router.post("/create",createSubmission)
 router.put("/update/:id" , updateSubmission )
//  router.put("/update/Learner/:id" , LearnerUpdateSubmission )
 router.delete("/delete/:id" ,deleteSubmission)

 export default router

 //,authINAD,, authINAD",authUser,authCommon,authINAD  
import express from 'express'
import { createSubmission, deleteSubmission, getSubmission, getSubmissionList, updateSubmission } from '../../controllers/submissionController.js'
import { authINAD } from '../../middleware/authIN-AD.js'
import { authCommon } from '../../middleware/authCommon.js'
import { authUser } from '../../middleware/authUser.js'



 const router = express.Router()

 router.get("/submissionList", authINAD,getSubmissionList )
 router.get("/:id",authINAD, getSubmission )
 router.post("/post",authUser,createSubmission)
 router.put("/update/:id",authCommon , updateSubmission )
 router.delete("/delete/:id",authINAD ,deleteSubmission)

 export default router
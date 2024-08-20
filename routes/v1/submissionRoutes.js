import express from 'express'
import { createSubmission, deleteSubmission, getSubmissionList, updateSubmission } from '../../controllers/submissionController'


 const router = express.Router()

 router.get("/assignmentList", getSubmissionList )
 router.post("/create",createSubmission)
 router.put("/update/:id", updateSubmission )
 router.delete("/delete/:id", deleteSubmission)

 export default router
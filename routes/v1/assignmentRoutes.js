import express from 'express'
import { createAssignment, deleteAssignment, getAssignmentList, updateAssignment } from '../../controllers/AssignmentController.js'


 const router = express.Router()

 router.get("/assignmentList", getAssignmentList )
 router.post("/create",createAssignment)
 router.put("/update/:id", updateAssignment )
 router.delete("/delete/:id", deleteAssignment)

 export default router
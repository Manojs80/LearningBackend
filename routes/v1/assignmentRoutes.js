import express from 'express'
import { createAssignment, deleteAssignment, getAssignment, getAssignmentList, updateAssignment } from '../../controllers/AssignmentController.js'
import { authAdmin } from '../../middleware/authAdmin.js'
import { authINAD } from '../../middleware/authIN-AD.js'


 const router = express.Router()

 router.get("/assignmentList",authINAD, getAssignmentList )
 router.get("/getassignment/:id",authINAD, getAssignment )
 router.post("/create",authINAD, createAssignment)
 router.put("/update/:id",authINAD, updateAssignment )
 router.delete("/delete/:id", authAdmin, deleteAssignment)

 export default router
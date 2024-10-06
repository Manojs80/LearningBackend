import express from 'express'
import { createAssignment, deleteAssignment, getAssignment, getAssignmentList, updateAssignment } from '../../controllers/AssignmentController.js'
//import { authAdmin } from '../../middleware/authAdmin.js'
import { authINAD } from '../../middleware/authIN-AD.js'


 const router = express.Router()

 router.get("/assignmentList/:id", getAssignmentList )
 router.get("/getassignment/:id", getAssignment )
 router.post("/create", createAssignment)
 router.put("/update/:id",updateAssignment )
 router.delete("/delete/:id", deleteAssignment)

 export default router

 //authINAD,authINAD,authINAD,,authINAD,, authAdmin
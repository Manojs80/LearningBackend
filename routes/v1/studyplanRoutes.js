import express from 'express'
import { createStudyplan, deleteStudyplan, getStudyplan, updateStudyplan } from '../../controllers/studyplanController.js'

//import { authCommon } from '../../middleware/authCommon.js'
//import { authINAD } from '../../middleware/authIN-AD.js'
//import { authAdmin } from '../../middleware/authAdmin.js'


 const router = express.Router()

 router.get("/getstudyplan/:id", getStudyplan )
 router.post("/create",createStudyplan)
 router.put("/update/:id", updateStudyplan)

 router.delete("/delete/:id", deleteStudyplan)

 export default router

 //,authCommon,authINAD,,authINAD,,authAdmin ,pdfNote
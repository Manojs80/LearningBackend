import express from 'express'
import { createStudyplan, deleteStudyplan, getStudyplan, updateStudyplan } from '../../controllers/studyplanController.js'
import { authCommon } from '../../middleware/authCommon.js'
import { authINAD } from '../../middleware/authIN-AD.js'
import { authAdmin } from '../../middleware/authAdmin.js'


 const router = express.Router()

 router.get("/getstudyplan/:id",authCommon, getStudyplan )
 router.post("/create",authINAD,createStudyplan)
 router.put("/update/:id",authINAD, updateStudyplan)
 router.delete("/delete/:id",authAdmin, deleteStudyplan)

 export default router
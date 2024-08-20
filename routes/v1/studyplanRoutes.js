import express from 'express'
import { createStudyplan, deleteStudyplan, getStudyplan, updateStudyplan } from '../../controllers/studyplanController.js'


 const router = express.Router()

 router.get("/getstudyplan/:id", getStudyplan )
 router.post("/create",createStudyplan)
 router.put("/update/:id", updateStudyplan)
 router.delete("/delete/:id", deleteStudyplan)

 export default router
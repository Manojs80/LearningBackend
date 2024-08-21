import express from 'express'
import { createCourse, deleteCourse, getCourse, getCourseList, updateCourse } from '../../controllers/courseController.js'
import { upload } from '../../middleware/middlewareUpload.js'
import { authAdmin } from '../../middleware/authAdmin.js'
import { authINAD } from '../../middleware/authIN-AD.js'


//,upload.single("image"),
//router.post("/create",upload.single("image"),createCourse)

const router = express.Router()

router.get("/courseList", authAdmin ,getCourseList )
router.get("/getcourse/:id",authINAD, getCourse)
router.post("/create",upload.single("image"),authINAD ,createCourse)
router.put("/update/:id",authINAD ,updateCourse )
router.delete("/delete/:id",authAdmin, deleteCourse)

export default router
import express from 'express'
import { createCourse, deleteCourse, getCourse, getCourseList, getCourseListId, updateCourse } from '../../controllers/courseController.js'
import { upload } from '../../middleware/middlewareUpload.js'
import { authAdmin } from '../../middleware/authAdmin.js'
import { authINAD } from '../../middleware/authIN-AD.js'


//,upload.single("image"),
//router.post("/create",upload.single("image"),createCourse)

const router = express.Router()

router.get("/courseList",getCourseList )
router.get("/courseList/:id",getCourseListId )
router.get("/getcourse/:id", getCourse)
router.post("/create",upload.single("image") ,createCourse)
router.put("/update/:id",upload.single("image"),updateCourse )
router.delete("/delete/:id", deleteCourse)

export default router

//authINAD ,,authINAD ,authAdmin
import express from 'express'
import { createCourse, deleteCourse, getCourseList, updateCourse } from '../../controllers/courseController.js'
import { upload } from '../../middleware/middlewareUpload.js'


//,upload.single("image"),
//router.post("/create",upload.single("image"),createCourse)

const router = express.Router()

router.get("/courseList", getCourseList )
router.post("/create",upload.single("image"),createCourse)
router.put("/update/:id", updateCourse )
router.delete("/delete/:id", deleteCourse)

export default router
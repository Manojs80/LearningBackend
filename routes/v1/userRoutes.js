import express from 'express'
import { checkUser, UserCourseAdd, userCreate , userDelete, userList, userLogin, userProfile, userUpdate} from '../../controllers/userController.js'
import { authUser } from '../../middleware/authUser.js'
import { authAdmin } from '../../middleware/authAdmin.js'
import { upload } from '../../middleware/middlewareUpload.js'


const router = express.Router()


router.post("/create",upload.single("image"), userCreate)
router.post("/login", userLogin)
router.get("/profile/:id",userProfile)
router.get("/userlist",userList)
router.put("/update/:id" ,upload.single("profilepic"), userUpdate)
router.put("/courseadd/:id" ,authUser, UserCourseAdd)
router.delete("/delete/:id", userDelete)

router.get("/check-user",authUser, checkUser)


export default router

//, authUser ,, authUser,, authAdmin
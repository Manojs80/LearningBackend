import express from 'express'
import { userCreate , userDelete, userLogin, userProfile, userUpdate} from '../../controllers/userController.js'
import { authUser } from '../../middleware/authUser.js'
import { authAdmin } from '../../middleware/authAdmin.js'

const router = express.Router()


router.post("/create", userCreate)
router.post("/login", userLogin)
router.get("/profile/:id", authUser ,userProfile)
router.put("/update/:id", authUser , userUpdate)
router.delete("/delete/:id", authAdmin, userDelete)

//router.get("/check-user",authUser, checkUser)


export default router
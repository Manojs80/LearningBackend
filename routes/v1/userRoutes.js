import express from 'express'
import { userCreate , userLogin, userProfile} from '../../controllers/userController.js'

//import { checkUser, userCreate, userLogin, userProfile } from '../../controllers/userController.js'
import { authUser } from '../../middleware/authUser.js'

const router = express.Router()


router.post("/create", userCreate)
router.post("/login", userLogin)
router.get("/profile/:id", authUser ,userProfile)


//router.get("/check-user",authUser, checkUser)


export default router
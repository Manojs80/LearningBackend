import express from 'express'
import { PaymentController, PaymentDetails } from '../../controllers/PaymentController.js'



const router = express.Router()


router.post("/create-checkout-session",PaymentController)
router.get("/details",PaymentDetails)




export default router
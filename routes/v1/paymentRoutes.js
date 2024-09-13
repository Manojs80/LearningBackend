import express from 'express'
import { PaymentController } from '../../controllers/PaymentController.js'



const router = express.Router()


router.post("/create-checkout-session",PaymentController)





export default router
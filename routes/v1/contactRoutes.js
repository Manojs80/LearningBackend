import express from 'express'
import { createContact,  deleteContact,  getContact, getContactList } from '../../controllers/contactController.js'


 const router = express.Router()

 router.get("/contactList", getContactList)
  router.get("/get/:id", getContact)
 router.post("/create",createContact)
 router.delete("/delete/:id", deleteContact)

 export default router
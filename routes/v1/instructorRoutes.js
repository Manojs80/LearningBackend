import express from "express";
import { checkInstructor, instructorCreate, instructorDelete, instructorLogin, instructorProfile, instructorUpdate } from "../../controllers/instructorController.js";
import { authInstructor } from "../../middleware/authInstructor.js";
import { authINAD } from "../../middleware/authIN-AD.js";
const router = express.Router();

router.post("/create", instructorCreate);
router.post("/login",instructorLogin);
router.get("/profile/:id", authINAD, instructorProfile);
router.put("/update/:id", authINAD, instructorUpdate)
router.delete("/delete/:id", authINAD, instructorDelete)
router.get("/check-instructor", authInstructor, checkInstructor);



export default router;
import express from "express";
import { checkInstructor, instructorCreate, instructorLogin, instructorProfile } from "../../controllers/instructorController.js";
import { authInstructor } from "../../middleware/authInstructor.js";
const router = express.Router();

router.post("/create", instructorCreate);
router.post("/login",instructorLogin);
router.get("/profile/:id", authInstructor, instructorProfile);

router.get("/check-instructor", authInstructor, checkInstructor);



export default router;
import express from "express";
import { checkInstructor, instructorCreate, instructorDelete, instructorLogin, instructorProfile, instructorUpdate, ListInstructor } from "../../controllers/instructorController.js";
import { authInstructor } from "../../middleware/authInstructor.js";
import { authINAD } from "../../middleware/authIN-AD.js";
import { upload } from '../../middleware/middlewareUpload.js'

const router = express.Router();

router.post("/create",upload.single("image"), instructorCreate);
router.post("/login",instructorLogin);
router.get("/profile/:id", instructorProfile);
router.put("/update/:id",upload.single("profilepic"), instructorUpdate)
router.delete("/delete/:id",  instructorDelete)
router.get("/check-instructor", authInstructor, checkInstructor);
router.get("/instructorlist", ListInstructor);


export default router;
// authINAD, authINAD,authINAD,
import express from "express";
import { checkInstructor, instructorCreate, instructorDelete, instructorLogin, instructorProfile, instructorUpdate, ListInstructor } from "../../controllers/instructorController.js";
import { authInstructor } from "../../middleware/authInstructor.js";
import { authINAD } from "../../middleware/authIN-AD.js";
import { upload } from '../../middleware/middlewareUpload.js'

const router = express.Router();

router.post("/create",upload.single("image"), instructorCreate);
router.post("/login",instructorLogin);
router.get("/profile/:id", instructorProfile);
router.put("/update/:id", authINAD, instructorUpdate)
router.delete("/delete/:id", authINAD, instructorDelete)
router.get("/check-instructor", authInstructor, checkInstructor);
router.get("/instructorlist", authInstructor, ListInstructor);


export default router;
// authINAD,
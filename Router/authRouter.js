import { Router } from "express";
const router=Router()
import { getCurrentUser, getAppicationStats, updatetUser  } from "../controller/authController.js";
import { validateUpdateUser } from "../middleware/validateMiddleware.js";
import {authorizePermissions, checkForTestUser,} from "../middleware/authMiddleware.js"
import upload from "../middleware/multerMiddleware.js";
router.get("/current/user", getCurrentUser)
router.get("/admin/app/stats",[authorizePermissions("admin"), getAppicationStats])
router.patch("/update/user",upload.single("avatar"), checkForTestUser, validateUpdateUser, updatetUser)

export default router
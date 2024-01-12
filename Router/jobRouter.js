
import { Router } from "express";
import { getAllJobs, postJob, updateJob, getJob, deleteJob, showStats } from "../controller/jobController.js";
import {validateJobInput, validateIdParams} from "../middleware/validateMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
const router=Router()
router.route('/')
.get(getAllJobs)
.post(checkForTestUser, validateJobInput,postJob)
router.route("/stats").get(showStats)
router.route('/:id')
.get(validateIdParams,getJob)
.patch(checkForTestUser,validateJobInput ,validateIdParams,updateJob)
.delete(checkForTestUser,validateIdParams,deleteJob)

export default router;
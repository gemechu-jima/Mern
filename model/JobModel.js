
import mongoose from "mongoose";
import { JOB_STATUS,JOB_SORT_BY,JOB_TYPE } from "../utils/constant.js";
const JobSchema=new mongoose.Schema({
    compancy:String,
    position:String,
    jobStatus:{
        type:String,
        emm:Object.values(JOB_STATUS),
        default:JOB_STATUS.PENDING
    },
    jobType:
    {
        type:String,
        emm:Object.values(JOB_TYPE),
        default:JOB_TYPE.FULL_TIME
    },
    jobLocation:{
   type:String,
   default:"Addis Ababa"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    }
}, {timestamps:true})

export default mongoose.model("job", JobSchema)
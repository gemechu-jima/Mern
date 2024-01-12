
import mongoose from "mongoose";
import { JOB_STATUS,JOB_SORT_BY,JOB_TYPE } from "../utils/constant";
const JobSchema=new mongoose.Schema({
    compancy:String,
    position:String,
    jobStatus:{
        type:String,
        emm:["pending","decline", "interview"],
        default:"inteview"
    },
    jobType:
    {
        type:String,
        emm:["full-time","part-time","intership"],
        default:"full-time"
    },
    jobLocation:{
   type:String,
   default:"Addis Ababa"
    }
}, {timestamps:true})

export default mongoose.model("job", JobSchema)

import Job from "../model/JobModel.js";
import mongoose from "mongoose"
import day from "dayjs";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../error/CustomerError.js";
import {nanoid} from "nanoid"
let jobs=[
    {id:nanoid(), compancy:"Facebook", position:"customer Lead"},
    {id:nanoid(), compancy:"Google", position:"Assistent voice"},
    {id:nanoid(), compancy:"Apple", position:"Seller"},
  ]

export const getAllJobs=async (req, res)=>{
   const {search, jobStatus, jobType, sort}=req.query;
   const queryObject={
    createdBy:req.user.userId
   }
   if(search){
    queryObject.$or=[
      {position:{$regex:search, $options: 'i' }},
      {compancy:{$regex:search, $options: 'i' }}
    ]
   }
const sortOptions={
  newest:"-createdAt",
  oldest:"createdAt",
  "a-z":"position",
  "z-a":"-position"
}
const sortKey=sortOptions[sort] || sortOptions.newest
   if(jobStatus && jobStatus!=="all"){
    queryObject.jobStatus=jobStatus
   }
   if(jobType && jobType!=='all'){
    queryObject.jobType=jobType
   }
   const page=Number(req.query.page )||1;
   const limit=Number(req.query.limit )|| 10;
   const skip=(page-1)*limit
   const totalJobs=await Job.countDocuments(queryObject)
  const jobs=await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit)
  const numpages=Math.ceil(totalJobs/limit)
    res.status(StatusCodes.OK).json({totalJobs, numpages, currentPage:page,jobs})
   }

export const postJob=async(req, res)=>{
   req.body.createdBy=req.user.userId
   console.log(req.user.userId)
    const job=await Job.create(req.body)
    jobs.push(job)
    res.status(StatusCodes.CREATED).json({job})
  }
export const getJob=async(req,res)=>{
    const {id} =req.params;
   const job=await Job.findById(id)
    res.status(StatusCodes.OK).json({job})
  }
export const updateJob=async(req, res)=>{
    const {id}=req.params
    const updatedJob=await Job.findByIdAndUpdate(id, req.body, {new:true})

    if(!updatedJob) throw new NotFoundError(`no job with id : ${id}`)

    res.status(StatusCodes.OK).json({msg:"Job is updated successfully", job:updatedJob})
    }
export const deleteJob=async(req, res)=>{
    const {id}=req.params
     const deletedJob = await Job.findByIdAndDelete(id)
    if(!deletedJob) throw new NotFoundError(`no job with id : ${id}`)
    
    res.status(StatusCodes.OK).json({msg:"Job Is deleted successfully", job:deletedJob})
  }
export const showStats=async(req, res)=>{
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  console.log(stats)
  const defaultStats = {
    pending: stats.pending,
    interview: stats.interview,
    declined: stats.declined,
  };
let monthlyApplications=await Job.aggregate([
  {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}},
  {$group:{_id:{year:{$year:"$createdAt"}, month:{$month:"$createdAt"}}, count:{$sum:1}} },
  {$sort:{"_id.year":-1, "_id.month":-1}},
  {$limit:6}
])
monthlyApplications=monthlyApplications.map((item)=>{
  const {_id:{year, month}, count}=item;
  const date=day().year(year).month(month).format("MMM, YY")
  return{date, count}
}).reverse()
console.log(monthlyApplications)
  // let monthlyApplications = [
  //   {
  //     date: 'May 23',
  //     count: 12,
  //   },
  //   {
  //     date: 'Jun 23',
  //     count: 9,
  //   },
  //   {
  //     date: 'Jul 23',
  //     count: 3,
  //   },
  // ];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
}
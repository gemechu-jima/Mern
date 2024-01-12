import {nanoid} from "nanoid"
let jobs=[
    {id:nanoid(), compancy:"Facebook", position:"customer Lead"},
    {id:nanoid(), compancy:"Google", position:"Assistent voice"},
    {id:nanoid(), compancy:"Apple", position:"Seller"},
  ]

export const getAllJobs=async (req, res)=>{
    res.status(201).json({jobs})
   }

   export const postJob=async(req, res)=>{
    const {compancy, position}=req.body
    const id=nanoid(10)
 
    if(!compancy || !position){
     return res.status(404).json({msg:"Some problem happen"})
    }
    const job={id, compancy, position}
    jobs.push(job)
    res.status(201).json({job})
  }
  export const getJob=async(req,res)=>{
    const {id} =req.params;
    if(!id){
      return res.status(403).json({msg:"Pleas ecorrect id your enter"})
    }
    const job=jobs.find(job=>job.id===id)
    res.status(201).json({job})
  }
  export const updateJob=(req, res)=>{
    const {compancy, position}=req.body
    const {id}=req.params
    if(!id){
      return res.status(403).json({msg:"Data is not update"})
    }
    let job=jobs.find(job=>job.id===id)
    job.compancy=compancy,
    job.position=position
    jobs.push(job)
    res.status(201).json({jobs})
    }
export const deleteJob=(req, res)=>{
    const {id}=req.params
     const job = jobs.find((job) => job.id === id);
    if(!job){
      return res,status(403).send("Please enter correct ID")
    }
    jobs=jobs.filter(job=>job!==id)
    res.status(201).json({msg:"Job Is deleted"})
  }
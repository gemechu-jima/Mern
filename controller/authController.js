import { StatusCodes } from "http-status-codes";
import Job from "../model/JobModel.js"
import User from "../model/userModel.js"
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

export const getCurrentUser=async(req,res)=>{
    const user =await User.findOne({ _id:req.user.userId})
    const userwhithoutpassword=user.toJSON()
    res.status(StatusCodes.OK).json({user:userwhithoutpassword})
}
export const getAppicationStats=async(req,res)=>{
    const users=await User.countDocuments()
    const jobs=await Job.countDocuments()
    res.status(StatusCodes.OK).json({users, jobs})
}
export const updatetUser=async(req, res)=>{
   const newUser={...req.body}
   delete newUser.password
if(req.file){
    const response=await cloudinary.v2.uploader.upload(req.file.path)
    await fs.unlink(req.file.path)
    newUser.avatar=response.secure_url
    newUser.avatar=response.public_id
}
    const updateUser=await User.findByIdAndUpdate(req.user.userId, newUser)
    if(req.file && updateUser.avatarpublicId){
        await cloudinary.v2.uploader.destroy(updateUser.avatarpublicId);
    }
    res.status(StatusCodes.OK).json({msg:"user is updated"})
}
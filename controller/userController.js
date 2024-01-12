import { StatusCodes } from "http-status-codes"
import User from "../model/userModel.js"

import {hashPassword, comparePassword} from "../utils/PasswordUtils.js";
import { UnauthenticatedError} from "../error/CustomerError.js";
import { createJwt } from "../utils/tokenUtils.js";


export const register=async (req, res)=>{
    const isFirstUser=await User.countDocuments()===0;
    req.body.role=isFirstUser ? "admin": "user"
     const hashedPassword=await hashPassword(req.body.password)
    req.body.password=hashedPassword
    const user=await User.create(req.body)
      res.status(StatusCodes.CREATED).json({register:user})
     }
export const login=async(req, res, next)=>{
    const {password}=req.body
    const user=await User.findOne({email:req.body.email})
    const isValidUser = user && (await comparePassword(password, user.password));
    if (!isValidUser) throw new UnauthenticatedError('invalid credentials');
    const token = createJwt({userId:user?._id, role:user?.role})

 
      const oneDay=1000*60*60*24;
      res?.cookie('token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + oneDay),
          secure: process.env.NODE_ENV === 'production',
        });
   
     
    res.status(StatusCodes.CREATED).json({msg:"Login route"})
    }
export const logout=async(req,res)=>{
    res.cookie("token", "logout", {
      httpOnly:true,
      expires:new Date( Date.now())
    })
    res.status(StatusCodes.OK).json({msg:"user Successfuly logout"})
    }
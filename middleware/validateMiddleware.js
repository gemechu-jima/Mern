import {body, param, validationResult} from "express-validator"
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../error/CustomerError.js"
import { JOB_STATUS, JOB_TYPE } from "../utils/constant.js"
import Job from "../model/JobModel.js"
import User from "../model/userModel.js"
import mongoose from "mongoose"

function ValidateMiddlewareError(validateValue) {
    return [
        validateValue,
        (req, res, next)=>{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
             const errMessage=errors.array().map(error=>error.msg)
             if(errMessage[0].startsWith("no job")){
                throw new NotFoundError(errMessage)
             }
             if(errMessage[0].startsWith("no authorized")){
                throw new UnauthenticatedError("no authorized to access this route ")
             }
             throw new BadRequestError(errMessage)
            }
            next()
          },
    ]
  
}

export const validateJobInput=ValidateMiddlewareError(
[body("compancy")
.notEmpty()
.withMessage("compancy is required")
.isLength({min:3, max:50})
.withMessage("Enter correct length")
.trim()], 
[body("position")
.notEmpty()
.withMessage("position is required")],
 
[body("jobLocation")
.notEmpty()
.withMessage("Job location is required")
.isLength({min:3, max:50})],

[body("jobStatus")
.isIn(JOB_STATUS)
.withMessage("invalide status")
]
[body("jobType")
.isIn(JOB_TYPE)
.withMessage("invalid job type")
]

)
export const validateIdParams=ValidateMiddlewareError(
    [
        param("id")
        .custom(async(value, {req})=>{
            const isvalid=mongoose.Types.ObjectId.isValid(value)
          
            if(!isvalid) throw new BadRequestError("not valid mongoDB ID")
            const job=await Job.findById(value)
           if(!job) throw new NotFoundError("This job is don't exist")
           const isAdmin=req.user.role==="admin"
           const isOwner=req.user.useId=job.createdBy.toString()
           if(!isAdmin && !isOwner){
            throw new UnauthenticatedError("no authorized to access this route ")
           }
        })
        .withMessage("invalid Mongo ID")
    ]
    )

export const validateRegisterInput=ValidateMiddlewareError(
    [
        body("name")
        .notEmpty()
        .withMessage("name is required")
       ,
        body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email enter")
        .custom(async(email)=>{
            const user=await User.findOne({email})
            if(user){
                throw new BadRequestError("This email aready exist")
            }
        }),
        
        body("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({min:8})
        .withMessage("please password must be 8 lenth or above")
        .isStrongPassword()
        .withMessage("please mixed with character and symbol as well as capital letter and strong your password"),
        body("location")
        .notEmpty()
        .withMessage("location required"),
        body("lastName")
        .notEmpty()
        .withMessage("las name is required ")

    ]
)
export const validateLoginInput=ValidateMiddlewareError(
    [
        body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email enter"),
        
        body("password")
        .notEmpty()
        .withMessage("password is required"),
    ]
)


export const validateUpdateUser=ValidateMiddlewareError(
    [
        body("name")
        .notEmpty()
        .withMessage("name is required")
       ,
        body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email enter")
        .custom(async(email, {req})=>{
            const user=await User.findOne({email})
            if (user && user._id.toString() !== req.user.userId) {
                throw new Error('email already exists');
              }
        }),
        
        body("location")
        .notEmpty()
        .withMessage("location required"),
        body("lastName")
        .notEmpty()
        .withMessage("las name is required ")

    ]
)
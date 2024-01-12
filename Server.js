import "express-async-errors"
import express from "express";
import morgan from "morgan"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from 'cloudinary';

//router
import Jobrouter from './Router/jobRouter.js'
import userRouter from './Router/userRouter.js';
import authRouter from "./Router/authRouter.js";

//public
import {dirname} from "path"
import { fileURLToPath } from "url";
import path from "path";
//middleware
import ErrorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticate } from "./middleware/authMiddleware.js";
const app=express()

const _dirnmae=dirname(fileURLToPath(import.meta.url))

import * as dotenv from "dotenv"
  dotenv.config()
  app.use(express.static(path.resolve(_dirnmae, "./public")))
  app.use(cookieParser())
  app.use(express.json())
 
  if(process.env.NODE_ENV){
    app.use(morgan("dev"))
  }
 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const port=process.env.PORT || 4000
  app.get('/api/v1/test',
   (req, res) => {
    const { name } = req.body;
    res.json({ msg: `test test` });
  });


app.use('/api/v1/jobs',authenticate, Jobrouter)
app.use('/api/v1/users',   userRouter)
app.use("/api/v1/auth",authenticate,authRouter)

app.get("*",(req,res)=>{
  res.sendFile(path.resolve(_dirnmae, "./public", "dist/index.html"))
})

  app.use("*", (req,res)=>{
    res.status(403).json({msg:"Not Found"})
  })
 //error handler
  app.use(ErrorHandlerMiddleware)
  try {
   await mongoose.connect(process.env.MONGO_URL)
   app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
  })
  } catch (error) {
    console.log(error)
  }

import mongoose, { Mongoose } from "mongoose";

const userSchema=new mongoose.Schema({

    name:String,
    email:String,
    password:String,
    lastName:{
        type:String,
        default:"lastName",
    },
    location:{
    type:String,
    default:"my city"
    },
    role:{
        type:String,
        emm:["user","admin"],
        default:"user"
    },
    avatar:String,
    avatarpublicId:String
})

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  };
export default mongoose.model("user", userSchema)
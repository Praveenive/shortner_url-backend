import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        maxlength:32,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    accountStatus:{
        type:String,
        required:true
    }
    
})

const generateJwtToken = (id)=>{
    return jwt.sign({id},process.env.SECRET_KEY)
}

const User = mongoose.model("user",userSchema)
export {User,generateJwtToken}
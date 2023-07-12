import mongoose from "mongoose";

const shortnerScheme = new mongoose.Schema({
    LongUrl :{
        type:String,
        minlength:15,
        required:true
    },
    shortUrl:{
        type:String,
        maxlength:20,
        index: true
    },
})

const Shortner = mongoose.model("shortner",shortnerScheme)
export {Shortner}
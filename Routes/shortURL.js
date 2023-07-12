import express from 'express'
import { Shortner } from '../Models/shortnerurl.js'

const router = express.Router()



router.post("/longurl",async(req,res)=>{
    try {
      const  longUrl=req.body.LongUrl;
      if (!longUrl) {
        console.log(longUrl)
    return res.status(400).json({ message: "Invalid URL" });
  }
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortUrl;
  let add;

  do {
    shortUrl =  Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    add = await Shortner.findOne({ shortUrl }); 
  } while (add); 

  add = await new Shortner({
    LongUrl: longUrl,
    shortUrl: shortUrl
  }).save();
        res.status(200).json({data:add,message:"Url added successfully",})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server error"})
    }
})

router.get("/shorturl/:shortUrl",async(req,res)=>{
    try {
        const redirect = await Shortner.findOne({shortUrl:req.params.shortUrl}) 
        console.log(req.params.shortUrl)
        console.log(redirect)
        if(redirect==null){
            return res.status(400).json({message:"Not a valid URL"})
        }
        res.redirect(redirect.LongUrl)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server error"})
    }
})



export const shortnerRouter = router
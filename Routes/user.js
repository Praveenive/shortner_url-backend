import  express  from "express";
import { generateJwtToken, User } from "../Models/users.js";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const router = express.Router()

router.post("/signup", async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email}) 
        console.log(user)
        if(user!==null){
           return res.status(400).json({message:"Email Id Already exists"})
        }
     const salt = await bcrypt.genSalt(10);
     const hashedpassword = await bcrypt.hash(req.body.password,salt)
     user = await new User({
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         email: req.body.email,
         password: hashedpassword,
         accountStatus:"inactive"
     }).save()
        res.status(202).json({data:user,message:"Signup Successully Done, Kindly activate Your Email "})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in signup"})
    }
})


router.post("/login", async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email})
        if(user===null){
           return res.status(400).json({message:"User Not found"})
        }
        const validatePassword = await bcrypt.compare(
            req.body.password,user.password
        )     
        if(!validatePassword){
           return  res.status(404).json({message:"Invalid credentials"})
        } 
        if(user.accountStatus=="inactive"){
            return res.status(402).json({message:"Email not Activate,Go to Email And activate"})
        }
        const token = generateJwtToken(user._id)
        res.status(202).json({data:user,message:"Logged in successfully",token})  
    } catch (error) {
        console.log(error)
       return res.status(500).json({message:"While login Error"})
    }
})

router.put("/resetpassword/:id", async(req,res)=>{
    try {
           const salt = await bcrypt.genSalt(10);
         const hashedpassword = await bcrypt.hash(req.body.password,salt)
        const update = await User.findOneAndUpdate(
            {_id:req.params.id},{$set:{password:hashedpassword}},{new:true}
        )
        console.log(update)
        if(!update){
            return res.status(400).json({message:"Kindly enter new Password"})
        }
        res.status(200).json({data:update,message:"Updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server error"})
    }
})

router.post("/activate",async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
if(user){    
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:'praveenhb0610@gmail.com',
      pass: 'nllatpwnkdieatgs'
    }
  });
  const id =  user._id.toString();
  const activationlink =`https://stalwart-macaron-f166f5.netlify.app/activate/${id}`;
  const mailOptions = {
    from: 'praveenhb0610@gmail.com',
    to: user.email,
    subject: 'Activate Your account',
    html: `
      <p>Hello,</p>
      <p>You have requested to activate your account. Please click on the following link to activate:</p>
      <a href="${activationlink}">Activate</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <p>Thank you</p>
    `
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error occurred:');
      console.log(error.message);
    } else {
      return res.status(202).json({message:"Activation message sent successfully"})
    }
  })}}
    catch (error) {
        console.log(error)
        res.status(500).json({message:"Server error"})
    }
})

router.put("/activatestatus/:id",async(req,res)=>{
    try {
         const update = await User.findOneAndUpdate(
            {_id:req.params.id},
            {$set:req.body},
            {new:true});
         console.log(update)
         if(!update){
            return res.status(400).json({message:"Email not activate"})
         }
        res.status(202).json({data:update,message:'Email succesfully Activated , Now Login'})
    } 
 catch (error) {
        console.log(error)
        res.status(500).json({message:"Server error"})
    }
})
export const userRouter = router;

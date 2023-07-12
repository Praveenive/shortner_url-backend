import nodemailer from 'nodemailer';
import express from'express'
import bcrypt from 'bcrypt';
import { User } from '../Models/users.js';

const router = express.Router()

router.post("/forgot",async(req,res)=>{
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
  const resetLink =`https://monumental-tartufo-c1fd22.netlify.app/reset/${id}`;
  const mailOptions = {
    from: 'praveenhb0610@gmail.com',
    to: user.email,
    subject: 'Reset Password',
    html: `
      <p>Hello,</p>
      <p>You have requested to reset your password. Please click on the following link to reset it:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <p>Thank you</p>
    `
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error occurred:');
      console.log(error.message);
    } else {
      return res.status(202).json({message:"Password reset email sent successfully!"})
    }
  });
  
}
else{
    return res.status(400).json({message:"User Not found"})
}
    }
 catch (error) {
       console.log(error)
       res.status(500).json({message:"Server issues"}) 
}
})



export const forgotpasswordrouter =router
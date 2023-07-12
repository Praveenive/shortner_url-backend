import  express from "express";
import dotenv from 'dotenv'
import cors from 'cors';
import { dbConnection } from "./db.js";
import { shortnerRouter } from "./Routes/shortURL.js";
import { userRouter } from "./Routes/user.js";

const app =express()
dotenv.config()
const PORT = process.env.PORT
app.use(cors())

app.use(express.json())
dbConnection()
app.use("/url",shortnerRouter)
app.use("/user" , userRouter)

app.listen(PORT,()=>console.log(`server started in ${PORT}`))
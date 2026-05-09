import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import profileRouter from './routes/profileRouter.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static("uploads"));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookieParser()) 
app.use(profileRouter)
app.listen(process.env.PORT,()=>{
    console.log(`Server Running at ${process.env.PORT}`)
})
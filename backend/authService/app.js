import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRouter.js'
import cookieParser from 'cookie-parser';
import adminRouter from './routes/adminRouter.js';

dotenv.config();
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookieParser())
app.use(authRouter)
app.use(adminRouter);
app.listen(process.env.PORT,()=>{
    console.log(`Server Running at ${process.env.PORT}`)
})
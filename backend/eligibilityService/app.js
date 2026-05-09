import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import eligibilityRouter from './routes/eligibilityRouter.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(eligibilityRouter)
app.listen(process.env.PORT,()=>{
    console.log(`Server running at ${process.env.PORT}`);
    
})

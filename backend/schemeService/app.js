import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/schemeRoutes.js';
import feedbackRouter from './routes/feedbackRoutes.js';
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(router);
app.use(feedbackRouter)

app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`);
    
})
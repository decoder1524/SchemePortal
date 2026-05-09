import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import notifyRoutes from './routes/notifyRouter.js';
dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(notifyRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server running at ${process.env.PORT}`);
    
})
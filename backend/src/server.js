import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser'
dotenv.config();

const app=express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes);


app.listen(port,()=>{
    console.log(`server listening to the port ${port}`);
    connectDB();
})
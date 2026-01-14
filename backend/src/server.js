import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
dotenv.config();

const app=express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes);

app.listen(port,()=>{
    console.log(`server listening to the port ${port}`);
})
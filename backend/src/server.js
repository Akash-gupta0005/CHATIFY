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
app.use(express.json({limit:"5mb"}));
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}));
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes);


const startServer = async () => {
  await connectDB(); // ⬅️ wait for MongoDB FIRST

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();
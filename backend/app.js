import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import connectDB from "./config/db.js";
import {connectRedis} from "./config/redis.js";
import productRoutes from "./routes/productRoutes.js"
dotenv.config();
const app=express();
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}));
app.use(express.json());
app.use("/api/products",productRoutes)
connectDB();
connectRedis();
app.get('/',(req,res)=>{
    res.json({
        message:"Redis Cache Project Running Successfully 🚀"
    });
});

const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`🚀 Server Running on Port ${port}`);
})
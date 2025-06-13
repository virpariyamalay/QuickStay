import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";


connectDB();
const app=express();
app.use(cors())

//middleware
app.use(express.json());
app.use(clerkMiddleware())

//api to listen to clerk webhook    
app.post("/api/clerk", clerkWebhooks);

app.use('/',(req,res)=>{
    res.send('api is working');
})

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

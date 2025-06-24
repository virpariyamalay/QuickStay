import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";


connectDB();
connectCloudinary();

const app = express();
// CORS configuration: allow frontend and local dev
app.use(cors({
    origin: ["http://localhost:5173", "https://quickstay365.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Handle preflight requests globally
app.options('*', cors());

// CORS catch-all (ensures headers are set even if route is missed)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://quickstay365.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

//API to listen stripe webhooks
app.post('/api/stripe', express.raw({ type: "application/json" }), stripeWebhooks)

//middleware
app.use(express.json());
app.use(clerkMiddleware())

//api to listen to clerk webhook    
app.use("/api/clerk", clerkWebhooks);

app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);
app.use('/', (req, res) => {
    res.send('api is working');
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

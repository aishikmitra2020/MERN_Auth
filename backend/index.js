import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { createClient } from "redis";

dotenv.config();

await connectDB();

const redisUrl = process.env.REDIS_URL

if (!redisUrl){
    console.log("Missing redis url");
    process.exit(1);
}

export const redisClient = createClient({
    url: redisUrl
})

redisClient
    .connect()
    .then(() => console.log("connected to redis"))
    .catch(() => console.error)

const app = express();

// middlewares
app.use(express.json())

// Importing routes
import userRoutes from './routes/user.js'

// Using Routes
app.use("/api/v1", userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
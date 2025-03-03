import "dotenv/config";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PORT } from './config/config.js';
import { connectDB } from "../db/connect.js";
import userRouter from "./routes/user.js";
import contentRouter from "./routes/content.js";

await connectDB();
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/content', contentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
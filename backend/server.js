import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';
const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
    'https://resume-builder-nu-tawny.vercel.app',
    'http://localhost:5173',
];

// Database connection
await connectDB();

app.use(express.json());
app.use(cors({
    origin: (origin, callback) => {
        callback(null, !origin || allowedOrigins.includes(origin));
    },
}));

app.get('/', (req , res) => res.send("Hello World!"));
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

import { readFile } from 'fs/promises';

import 'express-async-errors'
import morgan from 'morgan';

// Database
import connectDB from './db/connect.js';

// Routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from "./middleware/auth.js";
import Job from './models/Job.js';


if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
app.use(express.json());

app.get('/api/v1', (req, res) => {
    res.json({ msg: 'API' });
});

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}...`);
        });
    } catch (error) {
        console.error(error);
    }
}
start();
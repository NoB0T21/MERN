import express  from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectToDb from './db/db.js';
connectToDb();
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.routes.js';

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/',userRoutes)

export default app;
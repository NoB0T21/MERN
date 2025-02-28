import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import connectToDb from './DB/DB.js';
connectToDb();
import cors from 'cors';
import taskRoutes from './routes/task.routes.js';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',taskRoutes);

export default app;
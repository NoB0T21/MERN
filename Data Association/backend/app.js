import express  from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectToDb from './db/db.js';
connectToDb();

import userRoutes from './routes/user.routes.js';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',userRoutes)

export default app;
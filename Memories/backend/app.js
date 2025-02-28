import express from 'express';
const app = express();
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();
import connectToDB from './DB/mongoose_db.js';
connectToDB();

import postRouter from './routes/posts.routes.js';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', postRouter);

export default app
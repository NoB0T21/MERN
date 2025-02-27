import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();
import connectToDB from './DB/mongoose_db.js';
connectToDB();

import postRouter from './routes/posts.routes.js';

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/', postRouter);

export default app
import express from 'express';
const app = express();
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import connectToDB from './db/db.js'
connectToDB();

import notesRoutes from './routes/notes.routes.js'


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', notesRoutes);

export default app
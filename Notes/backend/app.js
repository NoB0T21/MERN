import express from 'express';
const app = express();
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import connectToDB from './db/db.js'
connectToDB();

import notesRoutes from './routes/notes.routes.js'


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', notesRoutes);

app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get('*',(req,res) =>{
    res.sendFile(path.resolve(__dirname,"../","frontend","dist","index.html"))
})

export default app
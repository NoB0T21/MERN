import express from 'express';
const routes = express.Router();

import {addNotes, getNotes, getNote} from '../controllers/notes.controller.js'

routes.get('/getnotes' , getNotes);
routes.post('/create' , addNotes)
routes.get('/read/:id' , getNote);

export default routes
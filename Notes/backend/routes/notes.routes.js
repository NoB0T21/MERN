import express from 'express';
const routes = express.Router();

import {addNotes, getNotes, getNote, updateNote, deleteNote} from '../controllers/notes.controller.js'

routes.get('/' , getNotes);
routes.get('/getnotes' , getNotes);
routes.post('/create' , addNotes)
routes.get('/read/:id' , getNote);
routes.put('/edit/:id' , updateNote);
routes.delete('/delete/:id' , deleteNote);

export default routes
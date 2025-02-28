import express from 'express';
import {showTasks, createTasks, updateTasks} from '../controllers/task.controllers.js';
const routes = express.Router();

routes.get('/',showTasks);
routes.post('/createtask', createTasks);
routes.post('/update/:id', updateTasks)

export default routes;
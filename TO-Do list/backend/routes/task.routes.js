import express from 'express';
import {showTasks, createTasks, updateTasks, deleteTasks} from '../controllers/task.controllers.js';
const routes = express.Router();

routes.get('/',showTasks);
routes.post('/createtask', createTasks);
routes.post('/update/:id', updateTasks)
routes.post('/delete/:id',deleteTasks)

export default routes;
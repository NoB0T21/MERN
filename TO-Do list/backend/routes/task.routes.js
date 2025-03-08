import express from 'express';
import {showTasks, createTasks, updateTasks, deleteTasks} from '../controllers/task.controllers.js';
import {body} from 'express-validator'
const routes = express.Router();

routes.get('/',showTasks);
routes.post('/createtask', body('task').isLength({min: 3}).withMessage('Must be 3 characters long'), createTasks);
routes.post('/update/:id', updateTasks)
routes.post('/delete/:id',deleteTasks)

export default routes;
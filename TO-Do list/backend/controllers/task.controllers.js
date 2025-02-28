import { createTask, showTask, updateTask } from "../services/task.service.js";

export const showTasks = async (req, res) => {
    const tasks = await showTask();
    res.json(tasks);
}

export const createTasks = async (req, res, next) => {
    const {task} = req.body;
    if(!task){
        return res.status(400).json({message: "user or password is invalid"    
        });
    }
    const user = await createTask({
        task,
    })
    res.json(user);
}

export const updateTasks = async (req, res, next) => {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({message: "uid not found"    
        });
    }
    const user = await updateTask({
        _id,
    })
    res.json(user);
}
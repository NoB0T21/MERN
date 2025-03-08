import { createTask, showTask, updateTask, deleteTask } from "../services/task.service.js";
import { validationResult } from 'express-validator';

export const showTasks = async (req, res) => {
    try {
        const tasks = await showTask();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};

export const createTasks = async (req, res, next) => {
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({
                error: err.array(),
                message: "Task must be at least 3 characters long",
            });
        }

        const { task } = req.body;
        if (!task) {
            return res.status(400).json({ message: "Task is required" });
        }

        const user = await createTask({ task });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error: error.message });
    }
};

export const updateTasks = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Task ID not found" });
        }

        const user = await updateTask({ id });
        if (!user) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error: error.message });
    }
};

export const deleteTasks = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Task ID not found" });
        }

        const user = await deleteTask({ id });
        if (!user) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }
};

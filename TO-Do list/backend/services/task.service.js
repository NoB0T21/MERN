import taskModels from '../models/task.models.js';

export const showTask = async () => {
    try {
        const tasks = await taskModels.find();
        return tasks;
    } catch (error) {
        throw new Error("Error fetching tasks: " + error.message);
    }
};

export const createTask = async ({ task }) => {
    try {
        if (!task) {
            throw new Error("Task is required");
        }
        const newTask = await taskModels.create({ task });
        return newTask;
    } catch (error) {
        throw new Error("Error creating task: " + error.message);
    }
};

export const updateTask = async ({ id }) => {
    try {
        if (!id) {
            throw new Error("Task ID is required");
        }
        const updatedTask = await taskModels.findOneAndUpdate(
            { _id: id },
            { done: true },
        );
        if (!updatedTask) {
            throw new Error("Task not found");
        }
        return updatedTask;
    } catch (error) {
        throw new Error("Error updating task: " + error.message);
    }
};

export const deleteTask = async ({ id }) => {
    try {
        if (!id) {
            throw new Error("Task ID is required");
        }
        const deletedTask = await taskModels.findOneAndDelete({ _id: id });
        if (!deletedTask) {
            throw new Error("Task not found");
        }
        return deletedTask;
    } catch (error) {
        throw new Error("Error deleting task: " + error.message);
    }
};

import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    task: {
        type: String,
    },
    done: {
        type: Boolean,
        default: false
    }
})

const task = mongoose.model('task', taskSchema);

export default task;
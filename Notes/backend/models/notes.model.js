import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, 'title is required'],
        minlength: [3, 'must be 3 chaacters long']
    },
    details: {
        type: String
    }
});

const note = mongoose.model('notes', noteSchema);
export default note;
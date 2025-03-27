import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        minlength: [3,'name must be atlest 3 characters long']
    },
    username:{
        type: String,
        require: true,
        unique: true,
        minlength: [3,'name must be atlest 3 characters long']
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
        unique: true,
    },
    image:{
        type: String,
        default:''
    },
});

const user = mongoose.model('user', userSchema);
export default user;
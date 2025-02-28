import mongoose, { now } from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type:String,
    },
    message: {
        type:String,
    },
    creator: {
        type:String,
    },
    tags: [{
        type:String,
    }],
    likecount: {
        type:Number,
        default: 0,
    },
    createdAt: {
        type:Date,
        default: Date.now(),
    },
    path:{
        type: String,
    },
    originalname:{
        type: String,
    },
    imageuri:{
        type: String,
    }
})

const post = mongoose.model('post', postSchema);

export default post;
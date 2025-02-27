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
        default: now.Date(),
    },
})

const post = mongoose.model('post', postSchema);

export default post;
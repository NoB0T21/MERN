const mongoose = require('mongoose');
const formatDate = require('./time')

const fileSchema = mongoose.Schema({
    creator: {
        type:String,
    },
    title: {
        type:String,
    },
    message: {
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
        type: String, 
        default: formatDate(new Date().toISOString())
    },
    path:{
        type: String,
    },
    originalname:{
        type: String,
    },
    ImageUrl:{
        type: String,
    },
});

const posts = mongoose.model('posts', fileSchema);

module.exports = posts;
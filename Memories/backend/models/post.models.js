const mongoose = require('mongoose');
const formatDate = require('./time')

const fileSchema = mongoose.Schema({
    creator: {
        required: true,
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
    likecount: [{
        type:mongoose.Schema.Types.ObjectId,
        red: 'user',
    }],
    createdAt: { 
        type: String, 
        default: formatDate(new Date().toISOString())
    },
    path:{
        required: true,
        type: String,
    },
    originalname:{
        required: true,
        type: String,
    },
    ImageUrl:{
        required: true,
        type: String,
    },
});

const posts = mongoose.model('posts', fileSchema);

module.exports = posts;
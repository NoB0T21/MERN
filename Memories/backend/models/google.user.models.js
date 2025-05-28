const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    picture: {
        required: true,
        type: String
    },
    sub: {
        required: true,
        type: String
    }
})

const googleUser = mongoose.model('Google Signin', formSchema)
module.exports = googleUser;
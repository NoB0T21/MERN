const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const formSchema = mongoose.Schema({
    firstName:{
        required: true,
        type: String
    },
    lastName:{
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    },
});

formSchema.methods.generateToken=  function(){
    const token = jwt.sign({
        id: this._id,
        email: this.email
    },process.env.JWT_SECRET)
    return token
};
const users = mongoose.model('Users',formSchema)
module.exports = users
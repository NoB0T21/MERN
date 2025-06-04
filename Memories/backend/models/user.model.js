const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
    },process.env.JWT_SECRET,{expiresIn: '1d',})
    return token
};

formSchema.methods.comparePassword = async function(password, hashpassword) {
    const pass = await bcrypt.compare(password, hashpassword)
    return pass
}

formSchema.statics.hashpassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash
}

const users = mongoose.model('Users',formSchema)
module.exports = users
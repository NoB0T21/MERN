const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const formSchema = mongoose.Schema({
    name:{
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
    picture: {
        type: String
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]
});

formSchema.methods.generateToken=  function(){
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        picture: this.picture
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
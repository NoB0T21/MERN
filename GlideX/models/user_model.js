const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters']
        },
        lastname:{
            type: String,
            minlength: [3, 'last name must be at least 3 characters']
        },
    },
    email:{
        type:String,
        required: true,
        unique: true,
        minlength:[5, 'Email must be at least 5 characters']
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    socketId:{
        type: String,
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(password, salt);
    })
}

module.exports = mongoose.model('user', userSchema);
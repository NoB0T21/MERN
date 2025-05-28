const userModel = require('../models/google.user.models');

module.exports.createGoogleUser = async({email,name,picture,sub}) => {
    if(!email || !name || !picture || !sub){
        throw new Error("require field")
    }
    try {
        const googleuser = await userModel.create({
            email,
            name,
            picture,
            sub
        });
        return googleuser;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getGoogleUser = async() => {
    try {
        const googleuser = await userModel.find();
        return googleuser;
    } catch (error) {
        throw new Error(error)
    }
}
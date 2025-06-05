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

module.exports.getGoogleUsers = async() => {
    try {
        const googleuser = await userModel.find();
        return googleuser;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getGoogleUser = async({email}) => {
    try {
        const googleuser = await userModel.findOne({email});
        if(!googleuser) return null
        return googleuser;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getGoogleUsersub = async({sub}) => {
    try {
        const googleuser = await userModel.findOne({sub});
        if(!googleuser) return null
        return googleuser;
    } catch (error) {
        throw new Error(error)
    }
}
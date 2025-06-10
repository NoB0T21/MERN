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

module.exports.getGoogleUser = async({email}) => {
    try {
        const googleuser = await userModel.findOne({email});
        if(!googleuser)throw new Error("Require all Fields");
        return googleuser;
    } catch (error) {
    }
}

module.exports.getGoogleUsersub = async({sub}) => {
    try {
        const googleuser = await userModel.findOne({sub});
        if(!googleuser) throw new Error("require field")
        return googleuser;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getGoogleUsers = async({userId}) => {
    try {
        const googleuser = await userModel.findOne({_id: userId});
        if(!googleuser) throw new Error("require field")
        return googleuser;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.findUserbyId = async({userId}) => {
    try {
        const googleuser = await userModel.findOne({_id: userId});
        return googleuser;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.findUserbyId2 = async({id}) => {
    try {
        const googleuser = await userModel.findOne({_id: id});
        return googleuser;
    } catch (error) {
        throw new Error(error)
    }
}
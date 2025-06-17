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
        return googleuser;
    } catch (error) {
    }
}

module.exports.getGoogleUsersub = async({sub}) => {
    try {
        const googleuser = await userModel.findOne({sub});
        return googleuser;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getGoogleUsers = async({userId}) => {
    try {
        const googleuser = await userModel.findOne({_id: userId});
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

module.exports.findUserbyIds = async ({id}) => {
    try {
        const user = await userModel.find({_id: {$in: id}});
        return user;
    } catch (error) {
        throw error
    }
}

module.exports.findUserbyName = async ({title}) => {
    try {
        const user = await userModel.find({name: title});
        return user;
    } catch (error) {
        throw error
    }
}
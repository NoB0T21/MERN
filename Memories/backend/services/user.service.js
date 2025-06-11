const userModel= require('../models/user.model');

module.exports.createUser = async ({name,email,picture,password}) => {
    if(!name || !email || !password ){
        return null
    }
    try {
        const user = await userModel.create({name,email,picture,password});
        if(!user)return null
        return user;
    } catch (error) {
        throw error
    }
}

module.exports.findUser = async ({email}) => {
    try {
        const user = await userModel.findOne({email});
        if(!user)return null
        return user;
    } catch (error) {
        throw error
    }
}

module.exports.findUserbyId = async ({userId}) => {
    try {
        const user = await userModel.findOne({_id: userId});
        return user;
    } catch (error) {
    }
}

module.exports.findUserbyId2 = async ({id}) => {
    try {
        const user = await userModel.findOne({_id: id});
        return user;
    } catch (error) {
        throw error
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

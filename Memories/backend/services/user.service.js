const userModel= require('../models/user.model');

module.exports.findUser = async ({email}) => {
    try {
        const user = await userModel.findOne({email});
        return user;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.createUser = async ({firstName,lastName,email,picture,password}) => {
    if(!firstName ||!firstName || !email || !password ){
        throw new Error("Require all Fields");
    }
    try {
        const user = await userModel.create({firstName,lastName,email,picture,password});
        return user;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.findUserbyId = async ({userId}) => {
    try {
        const user = await userModel.findOne({_id: userId});
        return user;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.findUserbyId2 = async ({id}) => {
    try {
        const user = await userModel.findOne({_id: id});
        return user;
    } catch (error) {
        throw new Error(error)
    }
}
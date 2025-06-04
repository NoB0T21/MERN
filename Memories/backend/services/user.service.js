const userModel= require('../models/user.model');

module.exports.findUser = async ({email}) => {
    try {
        const user = await userModel.findOne({email});
        return user;
    } catch (error) {
        throw new Error(error)
    }
}
module.exports.createUser = async ({firstName,lastName,email,password}) => {
    if(!firstName ||!firstName || !email || !password ){
        throw new Error("Require all Fields");
    }
    try {
        const user = await userModel.create({firstName,lastName,email,password});
        return user;
    } catch (error) {
        throw new Error(error)
    }
}
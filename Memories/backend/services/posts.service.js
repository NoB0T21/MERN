const postModel = require('../models/post.models');

module.exports.createFile = async({creator, title, message, tags, path, originalname, ImageUrl}) => {
    if(!creator ||!path || !originalname || !ImageUrl ){
        throw new Error("Require all Fields");
    }
    try {
        const file =  await postModel.create({
            creator,
            title,
            message,
            tags,
            path,
            originalname,
            ImageUrl,
        });
        return file;
    } catch (error) {
        throw new Error("Require all Fields");
    }
}

module.exports.getFile = async() => {
    try {
        const file =  await postModel.find();
        return file;
    } catch (error) {
        throw new Error("Require all Fields");
    }
}

module.exports.getFiles = async({userId}) => {
    if(!userId){
        throw new Error("Require all Fields");
    }
    try {
        const file =  await postModel.findOne({_id: userId});
        return file;
    } catch (error) {
        throw new Error("Require all Fields");
    }
}

module.exports.updateFile = async({userId, creator, title, message, tags}) => {
    if(!userId){
        throw new Error("Require all Fields");
    }
    try {
        const file =  await postModel.findOneAndUpdate({_id: userId},{
            creator,
            title,
            message,
            tags,
        }, {new: true});
        return file;
    } catch (error) {
        throw new Error("Require all Fields");
    }
}

module.exports.deleteFiles = async({userId}) => {
    if(!userId){
        throw new Error("Require all Fields");
    }
    try {
        const file =  await postModel.findOneAndDelete({_id: userId});
        return file;
    } catch (error) {
        throw new Error("Require all Fields");
    }
}
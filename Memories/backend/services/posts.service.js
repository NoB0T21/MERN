const postModel = require('../models/post.models');

module.exports.createFile = async({creator, title, message, tags, path, originalname, ImageUrl}) => {
    if(!creator || !title || !message || !tags ||!path || !originalname || !ImageUrl ){
        throw new Error("Require all Fields");
    }
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
}

module.exports.getFile = async() => {
    const file =  await postModel.find();
    return file;
}

module.exports.getFiles = async({userId}) => {
    if(!userId){
        throw new Error("Require all Fields");
    }
    const file =  await postModel.findOne({_id: userId});
    return file;
}

module.exports.updateFile = async({userId, creator, title, message, tags}) => {
    if(!userId){
        throw new Error("Require all Fields");
    }
    const file =  await postModel.findOneAndUpdate({_id: userId},{
        creator,
        title,
        message,
        tags,
    }, {new: true});
    return file;
}

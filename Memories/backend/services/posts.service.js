const postModel = require('../models/post.models');

module.exports.createFile = async({creator, title, message, tags,owner, path, originalname, ImageUrl}) => {
    if(!creator ||!path || !owner || !originalname || !ImageUrl ){
        throw new Error("Require all Fields");
    }
    try {
        const file =  await postModel.create({
            creator,
            title,
            message,
            tags,
            owner,
            path,
            originalname,
            ImageUrl,
        });
        return file;
    } catch (error) {
        throw error
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
        throw error
    }
}

module.exports.getFile = async({skip,limit}) => {
    try {
        const file =  await postModel.find().skip(skip).limit(limit);
        return file;
    } catch (error) {
        throw error
    }
}

module.exports.getPost = async({skip,limit,ids}) => {
    try {
        const file =  await postModel.find({owner: {$in: ids}}).skip(skip).limit(limit);
        return file;
    } catch (error) {
        throw error
    }
}

module.exports.updateFile = async({postId, title, message, tags}) => {
    if(!postId){
        throw new Error("Require all Fields");
    }
    try {
        const file =  await postModel.findOneAndUpdate({_id: postId},{
            title,
            message,
            tags,
        }, {new: true});
        return file;
    } catch (error) {
        throw error
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
        throw error
    }
}

module.exports.getuserposts = async({userId}) => {
    try {
        const file =  await postModel.find({owner: userId});
        return file;
    } catch (error) {
        throw error
    }
}

module.exports.getpostsById = async({userId}) => {
    try {
        const file =  await postModel.find({_id: userId});
        return file;
    } catch (error) {
        throw error
    }
}

module.exports.getpostsBySearch = async({title,tags}) => {
    try {
        const query = [];

if (title) {
  query.push({ title });
}

if (tags) {
    const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    if (tagList.length > 0) {
            query.push({ tags: { $in: tagList } });
        }
    }

        const file = await postModel.find(query.length > 0 ? { $or: query } : {});
        return file;
    } catch (error) {
        throw error
    }
}

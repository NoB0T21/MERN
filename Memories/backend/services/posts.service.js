import postModel from '../models/post.models.js'

export const createPost = async ({creator, title, message, tags, path, originalname, imageurl}) => {
    const post = postModel.create({
        creator,
        title,
        message,
        tags,
        path,
        originalname,
        imageurl,
    })
    return post;
}

export const getPosts = async (req,res) => {
    const posts = postModel.find()
    return posts;
}
import postModel from '../models/post.models.js'

export const createPost = async ({creator, title, message, tags, file}) => {
    const post = postModel.create({
        creator,
        title,
        message,
        tags,
        file
    })
    return post;
}

export const getPosts = async (req,res) => {
    const posts = postModel.find()
    return posts;
}
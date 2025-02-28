import { validationResult } from 'express-validator';
import {createPost, getPosts} from '../services/posts.service.js';

export const getPost = async (req,res) => {
    const post = await getPosts();
    res.status(200).json(post)
}

export const createPosts = async (req,res) => {
    res.json(req.body);
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({message: 'Validation failed', errors: err.array()})
    }
    const {creator, title, message, tags, file} = req.body;
    const post = await createPost({
        creator,
        title,
        message,
        tags,
        file
    })
    res.status(201).json(post)
}
import { validationResult } from 'express-validator';
import {createPost, getPosts} from '../services/posts.service.js';

import supabase from '../DB/supabase.js';
import multer from 'multer';
const upload = multer({storage: multer.memoryStorage()});
import uuid from 'uuid-v4';

export const getPost = async (req,res) => {
    const post = await getPosts();
    res.json(post)
}

export const createPosts = [
    upload.single('file'),
    async (req,res) => {
        const {file} = req;
        if(!file){
            return res.status(404).json({error: 'no such File Uploaded'})
        }
        const files = file.originalname;
        const refile = files.split(" ").join("");
        const uniqueFilename = `${uuid()}-${refile}`;

        const {data, error} = await supabase
            .storage
            .from('image')
            .upload(uniqueFilename, file.buffer,{
                contentType: file.mimetype,
                cacheControl: '3600',
                upsert: false,
            })
        if(error){
            return res.status(404).json({error: error.message});
        }

        getFilepath();
        async function getFilepath() {
            const{data,patherr} = await supabase
                .storage
                .from('image')
                .getPublicUrl(`${uniqueFilename}`);
            if(patherr){
                return res.status(404).json({error: patherr.message});
            }
        }


        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({message: 'Validation failed', errors: err.array()})
        }

        const {creator, title, message, tags} = req.body;
        const post = await createPost({
            creator,
            title,
            message,
            tags,
            path: uniqueFilename,
            originalname: file.originalname,
            imageurl: file.publicUrl
        })
        res.status(201).json(post)
    }
]
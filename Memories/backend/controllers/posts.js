const supabase = require('../DB/supabase');
const postServices = require('../services/posts.service');
const multer = require('multer');
const uuid = require('uuid-v4');
const upload =  multer({ storage: multer.memoryStorage() });

function serverError(res){
    return res.status(500).json({
        message: `Error code 500: server error`,
        success: false
    });
};

function notFound(res){
    return res.status(400).json({
        message: `Error code 400: Bad Request`,
        success: false
    });
};

module.exports.uploadFile =[ upload.single('file'), async (req, res) => {
        const { file } = req;
        const {creator, title, message, tags, owner} = req.body;
        if (!file || !creator) {
            return notFound(res);
        }
        try {
            const files = file.originalname;
            const refiles = files.split(" ").join("");
            const uniqueFilename = `${uuid()}-${refiles}`;

            const { data, error } = await supabase
                .storage
                .from('images')
                .upload(uniqueFilename, file.buffer, {
                    contentType: file.mimetype,
                    cacheControl: '3600',
                    upsert: false,
                });
            if (error) {
                return serverError(res);
            }
            getFilePath();

            async function getFilePath() {
                const { data, error } = await supabase
                    .storage
                    .from('images')
                    .getPublicUrl(`${uniqueFilename}`);
                if (error) {
                    return serverError(res);
                }
                const parsedTags = JSON.parse(tags);
                const newFile = await postServices.createFile({
                    creator,
                    title,
                    message,
                    tags: parsedTags,
                    owner,
                    path: uniqueFilename,
                    originalname: file.originalname,
                    ImageUrl: data.publicUrl,
                });
                if(!newFile){
                    return serverError(res);
                }
                return res.status(201).json({
                    message: "Post Created",
                    success:true
                });
            };
        } catch (error) {
            return serverError(res);
        }
    }
]

module.exports.getPost = async(req,res) => {
    const userId = req.params.id;
    if (!userId) {
        return notFound(res);
    }
    try {
        const userPost = await postServices.getFiles({userId});
        if(!userPost){
            return res.status(204).json({message: 'Post not Found'})
        }
        res.status(200).json(userPost);
    }catch(error){
        return serverError(res);
    }
};

module.exports.likePost = async (req, res) => {
    const userId = req.params.id;
    const id = req.user
    if (!userId) {
        return notFound(res);
    }
    try {
        const post = await postServices.getFiles({userId});
        if(!post){
            return res.status(204).json({message:'Post Not Found'})
        }
        const index = post.likecount.indexOf(id);
        
        if (index === -1) {
            post.likecount.push(id); // Like
        } else {
            post.likecount.splice(index, 1); // Unlike
        }
        await post.save();
        return res.status(200).json({
            message: "you Liked this post",
            success:true
        })
    } catch (error) {
        return serverError(res);
    };
};

module.exports.showPost = async (req, res) => {
    const page = Number(req.query.skip) || 0 ;
    const limit =  Number(req.query.limit) || 4;
    const ids = req.body;
    const skip = (page - 1) * limit;
    try {
        const userPosts = await postServices.getPost({ skip, limit,ids });
        if (!userPosts || userPosts.length === 0) {
            return res.status(204).json({message: 'Post not Found'})
        }
        res.status(200).json(userPosts); // ✅ Use 200 OK
    } catch (error) {
        return serverError(res)
    }
};

module.exports.updatePost =async (req, res) => {
    const postId = req.params.id;
    const {title, message, tags} = req.body;
    if (!postId) {
        return notFound(res);
    }
    try {
        const post = await postServices.updateFile({
            postId,
            title,
            message,
            tags,
        });
        if(!post){
            return res.status(204).json({message:'Post Not Found'})
        }
        return res.status(201).json({
            message: "Post updated",
            success:true
        })
    } catch (error) {
        return serverError(res);
    };
};

module.exports.deleteFile = async(req,res) => {
    const userId = req.params.id;
    if (!userId) {
        return notFound(res);
    }
    const user = await postServices.getFiles({userId});
    if (!user) {
        return res.status(204).json({message:'Post Not Found'})
    }
    try {
        const {data, error } = await supabase
            .storage
            .from('images')
            .remove([user.path])
        const userPost = await postServices.deleteFiles({userId});
        if (!userPost) {
            return serverError(res);
        }
        return res.status(201).json({
            message: "Post deleted",
            success:true
        });
    } catch (error) {
        return serverError(res)
    };
};

module.exports.showFile = async (req, res) => {
    const skip = Number(req.query.skip) || 0 ;
    const limit =  Number(req.query.limit) || 4;
    try {
        const userPosts = await postServices.getFile({ skip, limit });
        if (!userPosts || userPosts.length === 0) {
            return res.status(204).json({message: 'Post not Found'})
        }
        return res.status(200).json(userPosts); // ✅ Use 200 OK
    } catch (error) {
        return serverError(res)
    }
};

module.exports.getuserPosts = async(req,res) => {
    const userId = req.params.id;
    if (!userId) {
        return notFound(res);
    }
    try {
        const userPost = await postServices.getuserposts({userId});
        if(!userPost){
            return res.status(204).json({message:'Post Not Found'})
        }
        res.status(201).json(userPost);
    } catch (error) {
        return serverError(res)
    }
};
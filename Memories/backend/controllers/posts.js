const supabase = require('../DB/supabase');
const postServices = require('../services/posts.service');
const multer = require('multer');
const uuid = require('uuid-v4');
const upload =  multer({ storage: multer.memoryStorage() });

function serverError(res){
    return res.status(404).json({
        message: 'server error',
        success: false
    });
};

function notFound(res){
    return res.status(400).json({
        message: 'Bad Request',
        success: false
    });
};

module.exports.uploadFile =[
    upload.single('file'),
    async (req, res) => {
        const { file } = req;
        const {creator, title, message, tags} = req.body;

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
                const { data, urlError } = await supabase
                    .storage
                    .from('images')
                    .getPublicUrl(`${uniqueFilename}`);
                if (urlError) {
                    return serverError(res);
                }

                const newFile = await postServices.createFile({
                    creator,
                    title,
                    message,
                    tags,
                    path: uniqueFilename,
                    originalname: file.originalname,
                    ImageUrl: data.publicUrl,
                });
                if(!newFile){
                    return serverError(res);
                }
                return res.status(201).json({
                    message: "USer created",
                    success:true
                });
            };
        } catch (error) {
            return serverError(res);
        }
    }
]

module.exports.showFile = 
    async (req, res) => {
        const userPosts = await postServices.getFile();
        if(!userPosts){
            return serverError(res);
        }
        res.status(201).json(userPosts);
    };

module.exports.getPost = async(req,res) => {
    userId = req.params.id;
    if (!userId) {
        return notFound(res);
    }
    const userPost = await postServices.getFiles({userId});
    if(!userPost){
        return serverError(res);
    }
    res.status(201).json(userPost);
};

module.exports.updatePost =
    async (req, res) => {
    userId = req.params.id;
    const {creator, title, message, tags} = req.body;
    if (!userId) {
        return notFound(res);
    }
    try {
        const post = await postServices.updateFile({
            userId,
            creator,
            title,
            message,
            tags,
        });
        if(!post){
            return serverError(res);
        }
        return res.status(201).json({
            message: "USer created",
            success:true
        })
    } catch (error) {
        return serverError(res);
    };
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
            return serverError(res);
        }
        const index = post.likecount.indexOf(id);

        if (index === -1) {
            post.likecount.push(id); // Like
        } else {
            post.likecount.splice(index, 1); // Unlike
        }
        await post.save();
        return res.status(201).json({
            message: "USer created",
            success:true
        })
    } catch (error) {
        return serverError(res);
    };
};

module.exports.deleteFile = async(req,res) => {
    userId = req.params.id;
    if (!userId) {
        return notFound(res);
    }
    const user = await postServices.getFiles({userId});
    if (!user) {
        return notFound(res);
    }
    try {
        const {data, error } = await supabase
            .storage
            .from('images')
            .remove([user.path])
        const userPost = await postServices.deleteFiles({userId});
        if (!userPost) {
            return notFound(res);
        }
        return res.status(201).json({
            message: "USer created",
            success:true
        });
    } catch (error) {
        return serverError(res)
    };
};
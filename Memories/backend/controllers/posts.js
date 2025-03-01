const supabase = require('../DB/supabase');
const postServices = require('../services/posts.service');
const multer = require('multer');
const uuid = require('uuid-v4');
const upload =  multer({ storage: multer.memoryStorage() });

module.exports.uploadFile =[
    upload.single('file'),
    async (req, res) => {
        const { file } = req;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
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
            })
    
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        getFilePath();

        async function getFilePath() {
            const { data, urlError } = await supabase
                .storage
                .from('images')
                .getPublicUrl(`${uniqueFilename}`);

            if (urlError) {
                throw urlError;
            }

        const {creator, title, message, tags} = req.body;
        const newFile = await postServices.createFile({
            creator,
            title,
            message,
            tags,
            path: uniqueFilename,
            originalname: file.originalname,
            ImageUrl: data.publicUrl,
        });
        }
    }
]

module.exports.showFile = 
    async (req, res) => {
        const userPosts = await postServices.getFile();
        res.json(userPosts);
    }

module.exports.getPost = async(req,res) => {
    userId = req.params.id;
    const userPost = await postServices.getFiles({userId});
    res.json(userPost);
}
module.exports.updatePost =
    async (req, res) => {
        userId = req.params.id;
        const {creator, title, message, tags} = req.body;
        
        const post = await postServices.updateFile({
            userId,
            creator,
            title,
            message,
            tags,
        });
    }

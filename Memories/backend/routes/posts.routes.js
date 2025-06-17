const express = require('express');
const router = express.Router();
const googleAuthMiddleware = require('../middleware/google.auth.middleware')


const postController = require('../controllers/posts');

router.post('/upload',googleAuthMiddleware,postController.uploadFile);
router.get('/edit/:id',googleAuthMiddleware,postController.getPost)
router.get('/like/:id',googleAuthMiddleware,postController.likePost)
router.post('/users/byIds',googleAuthMiddleware, postController.showPost)
router.patch('/update/:id',googleAuthMiddleware,postController.updatePost)
router.post('/delete/:id',googleAuthMiddleware,postController.deleteFile);
router.get('/download/:id',googleAuthMiddleware,postController.downloadFile);
router.get('/home',postController.showFile)
router.get('/profile/:id',googleAuthMiddleware,postController.getuserPosts)
router.get('/post/:id',googleAuthMiddleware,postController.getPostByid)
router.get('/postByid/:id',googleAuthMiddleware,postController.getPostById)
router.get('/explore/search',postController.getPostsBySearch)

module.exports = router;
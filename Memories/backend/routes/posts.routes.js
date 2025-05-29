const express = require('express');
const router = express.Router();
const googleAuthMiddleware = require('../middleware/google.auth.middleware')


const postController = require('../controllers/posts');

router.get('/home', postController.showFile)
router.post('/upload',googleAuthMiddleware,postController.uploadFile);
router.get('/edit/:id',googleAuthMiddleware,postController.getPost)
router.patch('/update/:id',googleAuthMiddleware,postController.updatePost)
router.post('/delete/:id',googleAuthMiddleware,postController.deleteFile);

module.exports = router;
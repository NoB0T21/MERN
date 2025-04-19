const express = require('express');
const router = express.Router();


const postController = require('../controllers/posts');

router.get('/home', postController.showFile)
router.post('/upload',postController.uploadFile);
router.get('/edit/:id',postController.getPost)
router.patch('/update/:id',postController.updatePost)
router.post('/delete/:id',postController.deleteFile);

module.exports = router;
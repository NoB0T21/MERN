import express from 'express';
const router = express.Router();
import {body} from 'express-validator'

import { getPost , createPosts } from '../controllers/posts.js';

router.get('/posts', getPost)
router.post('/createPost',
    body('creator').isLength({min: 3}).withMessage('Creator must be at least 3 characters long'),
    body('title').isLength({min: 3}).withMessage('Title must be at least 3 characters long'),
    body('message').isLength({min: 3}).withMessage('Message must be at least 3 characters long'),
    createPosts)

export default router;
const express = require('express');
const router = express.Router();
const googleAuthMiddleware = require('../middleware/google.auth.middleware')

const userController = require('../controllers/users.controller');

router.get('/ff',googleAuthMiddleware, userController.getgoogleuser)
router.post('/google/signin',userController.googleUserSignin)

module.exports = router
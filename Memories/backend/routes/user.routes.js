const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');
const googleAuthMiddleware = require('../middleware/google.auth.middleware');

router.get('/',googleAuthMiddleware,userController.getgoogleuser)
router.post('/google/signin',userController.googleUserSignin)
router.post('/signup',userController.createusers)
router.get('/verify',userController.verifyUser)
router.get('/token',googleAuthMiddleware,userController.tokenUser)

module.exports = router
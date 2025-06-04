const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');
const googleAuthMiddleware = require('../middleware/google.auth.middleware');

router.get('/',googleAuthMiddleware,userController.getgoogleuser)
router.post('/google/signin',userController.googleUserSignin)
router.post('/signup',userController.createusers)
router.post('/signin',userController.loginusers)
router.get('/verify',googleAuthMiddleware,userController.verifyUser)
router.get('/token',googleAuthMiddleware,userController.tokenUser)
router.get('/logout',googleAuthMiddleware,userController.logoutUser)

module.exports = router
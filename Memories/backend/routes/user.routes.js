const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');
const googleAuthMiddleware = require('../middleware/google.auth.middleware');

router.post('/signup',userController.createusers)
router.post('/google/signin',userController.googleUserSignin)
router.post('/google',googleAuthMiddleware,userController.googleUser)
router.get('/user/:id',googleAuthMiddleware,userController.getgoogleuser)
router.post('/signin',userController.loginusers)
router.get('/token',userController.tokenUser)
router.get('/verify',googleAuthMiddleware,userController.verifyUser)
router.get('/logout',googleAuthMiddleware,userController.logoutUser)
router.get('/follow/:id',googleAuthMiddleware,userController.follow)
router.post('/follower',googleAuthMiddleware,userController.follower)
router.post('/following',googleAuthMiddleware,userController.follower)

module.exports = router
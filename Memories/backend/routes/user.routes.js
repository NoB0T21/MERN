const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');
const googleAuthMiddleware = require('../middleware/google.auth.middleware');

router.get('/user/:id',googleAuthMiddleware,userController.getgoogleuser)
router.post('/google/signin',userController.googleUserSignin)
router.post('/google',googleAuthMiddleware,userController.googleUser)
router.post('/signup',userController.createusers)
router.post('/signin',userController.loginusers)
router.get('/verify',googleAuthMiddleware,userController.verifyUser)
router.get('/token',googleAuthMiddleware,userController.tokenUser)
router.get('/logout',googleAuthMiddleware,userController.logoutUser)
router.get('/follow/:id',googleAuthMiddleware,userController.follow)

module.exports = router
const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');

router.get('/',userController.getgoogleuser)
router.post('/google/signin',userController.googleUserSignin)

module.exports = router
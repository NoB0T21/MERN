const userModel = require("../models/user_model");
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!body.isEmpty()){
        return res.this.status(400).json({error: error.array()});
    }

    const {fullname, email, password} = req.body;
    const hashPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashPassword
    });
    const token = user.generateAuthToken();
    res.status(201).json({token, user})
}
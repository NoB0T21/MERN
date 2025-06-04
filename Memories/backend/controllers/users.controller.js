const googleUserServices = require('../services/google.user.service');
const userServices = require('../services/user.service');
const jwt = require('jsonwebtoken')

function serverError(res){
    return res.status(404).json({
        message: 'server error',
        success: false
    });
};

function notFound(res){
    return res.status(400).json({
        message: 'Bad Request',
        success: false
    });
};

module.exports.googleUserSignin = async (req,res) => {
    const{email,name,picture,sub} = req.body
    if(!email||!name||!picture||!sub){
        return notFound(res)
    }
    const existinguser = await googleUserServices.getGoogleUser({email})
    const existinguser1 = await userServices.findUser({email})
    if(existinguser || existinguser1){
        return res.json({
            message: "User already exists",
            success:true
        });
    }
    const user = await googleUserServices.createGoogleUser({email,name,picture,sub})
    if(!user){
        return serverError(res)
    }
    return res.status(201).json({
        message: "User created",
        success:true
    });
}

module.exports.getgoogleuser = async (req,res) => {
    const user = await googleUserServices.getGoogleUsers()
    if(!user){
        return serverError(res)
    }
    res.json(user)
}

module.exports.createusers = async (req,res) => {
    const {firstName,lastName,email,password}=req.body
    if(!firstName||!lastName||!email||!password){
        notFound(res)
    }
    const existinguser = await googleUserServices.getGoogleUser({email})
    const existinguser1 = await userServices.findUser({email})
    if(existinguser !== null || (Array.isArray(existinguser1) && existinguser1.length > 0)){
        return res.json({
            message: "User already exists",
            success:true
        });
    }
    
    const user  = await userServices.createUser({firstName,lastName,email,password})
    if(!user){
        return serverError(res)
    }
    const token = user.generateToken();
    res.cookie('token',token);
    return res.status(201).json({
        message: "User created",
        success:true
    });
} 
module.exports.verifyUser = async (req,res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ error: 'No access token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = decoded
    res.json(user)
} 
module.exports.tokenUser = async (req,res) => {
    const token = req.cookies.token
    
    res.json(token)
} 
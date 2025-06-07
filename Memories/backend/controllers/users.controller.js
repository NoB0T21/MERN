const googleUserServices = require('../services/google.user.service');
const userServices = require('../services/user.service');
const userModel = require('../models/user.model')
const googleServices = require('../services/google.user.service')
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
    const userId = req.params.id;
    let user = await googleUserServices.getGoogleUsers({userId})
    if(!user){
        user = await userServices.findUserbyId({userId})
    }
    res.json(user)
}

module.exports.googleUser = async (req,res) => {
    const {sub} = req.body
    if(!sub){
        return serverError(res)
    }
    const user = await googleUserServices.getGoogleUsersub({sub})
    if(!user){
        return serverError(res)
    }
    res.json(user)
}



module.exports.createusers = async (req,res) => {
    const {firstName,lastName,email,picture,password}=req.body
    if(!firstName||!lastName||!email||!password){
        notFound(res)
    }
    try{
        const existinguser = await googleUserServices.getGoogleUser({email})
        try{
            const existinguser1 = await userServices.findUser({email})
            if(existinguser !== null || (Array.isArray(existinguser1) && existinguser1.length > 0)){
                return res.json({
                    message: "User already exists",
                    success:true
                });
            }
        }catch(error){return res.status(401).json({ error: 'No access token provided' });}
    }catch{}
    const hashpassword = await userModel.hashpassword(password)
    const user  = await userServices.createUser({firstName,lastName,email,picture,password: hashpassword})
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

module.exports.loginusers = async (req,res) => {
    const {email,password}=req.body
    if(!email||!password){
        notFound(res)
    }
    const existinguser = await googleUserServices.getGoogleUser({email})
    if(existinguser !== null ){
        return res.json({
            message: "User already exists",
            success:true
        });
    }
    const user = await userServices.findUser({email})
    if(!user){
            return res.status(400).json({message: "user or password is invalid"});
    }
    const ismatch = await user.comparePassword(password, user.password)
    if(!ismatch){
        return res.status(400).json({message: "user or password is invalid"});
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
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'Token not found' });
        }
        const user = await userServices.findUser({email: decoded.email})
        res.json(user)
    } catch (error) {
        return res.status(401).json({ error: 'Token not found' });
    }
}

module.exports.tokenUser = async (req,res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Token not found' });
        }
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports.logoutUser = async (req,res) => {
    try {
        res.cookie('token','');
        return res.status(201).json({
            message: "User created",
            success:true
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports.follow = async (req, res) => {
    const userId = req.params.id;
    const id = req.user
    if (!userId) {
        return notFound(res);
    }
    try {
        let user = await userServices.findUserbyId({userId});
        if(!user){
            user = await googleServices.findUserbyId2({userId});
        }
        let follower = await userServices.findUserbyId2({id});
        if(!follower){
            follower = await googleServices.findUserbyId({id});
        }

        if(!user){
            return serverError(res);
        }
        const index = user.followers.indexOf(id);
        const index2 = follower.following.indexOf(userId);
        
        if (index === -1 && index2 === -1) {
            user.followers.push(id);
            follower.following.push(userId); // Like
        } else {
            user.followers.splice(index, 1);
            follower.following.splice(index2, 1); // Unlike
        }
        await user.save();
        await follower.save();
        return res.status(201).json({
            message: "you Liked this post",
            success:true
        })
    } catch (error) {
        return serverError(res);
    };
};
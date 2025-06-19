const googleUserServices = require('../services/google.user.service');
const userServices = require('../services/user.service');
const userModel = require('../models/user.model')
const googleServices = require('../services/google.user.service')
const jwt = require('jsonwebtoken')

function serverError(res,code){
    return res.status(code).json({
        message: `Error code ${code}: server error`,
        success: false
    });
};

function notFound(res,code){
    return res.status(code).json({
        message: `Error code ${code}: Bad Request`,
        success: false
    });
};

module.exports.createusers = async (req,res) => {
    const {name,email,picture,password}=req.body
    if(!name||!email||!password){
        notFound(res,400)
    }
    try{
            const existingusers = await googleUserServices.getGoogleUser({email})
            const existinguser1 = await userServices.findUser({email})
            if(existingusers || existinguser1 ){
                return res.status(200).json({
                    message: "User already exists",
                    success:false
                });
            }
        }catch(error){return res.status(401).json({ error: 'No access token provided' });}
    const hashpassword = await userModel.hashpassword(password)
    const user  = await userServices.createUser({name,email,picture,password: hashpassword})
    if(!user){
        return serverError(res,500)
    }
    const token = user.generateToken();
    
    res.cookie('token',token,{
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
        message: "User created",
        success:true
    });
}

module.exports.googleUserSignin = async (req,res) => {
    const{name,email,picture,sub} = req.body
    if(!name||!email||!picture||!sub){
        return notFound(res,400)
    }
    
    const existinguser = await googleUserServices.getGoogleUser({email})
    const existinguser1 = await userServices.findUser({email})
    if(existinguser || existinguser1){
        return res.status(200).json({
            message: "User already exists",
            success:true
        });
    }
    const user = await googleUserServices.createGoogleUser({email,name,picture,sub})
    if(!user){
        return serverError(res,500)
    }
    return res.status(201).json({
        message: "User created",
        success:true
    });
}

module.exports.googleUser = async (req,res) => {
    const {sub} = req.body
    if(!sub){
        return serverError(res,400)
    }
    const user = await googleUserServices.getGoogleUsersub({sub})
    if(!user){
        return res.status(204).json({
            message: "No User present",
            success:true
        });
    }
    res.status(200).json(user)
}

module.exports.getgoogleuser = async (req,res) => {
    const userId = req.params.id;
    if(!userId){
        return serverError(res,400)
    }
    let user = await googleUserServices.getGoogleUsers({userId})
    if(!user){
        user = await userServices.findUserbyId({userId})
        if(!user){
            return res.status(204).json({
                message: "No User present",
                success:true
            });
        }
    }
    res.status(200).json(user)
} 

module.exports.loginusers = async (req,res) => {
    const {email,password}=req.body
    if(!email||!password){
        notFound(res,400)
    }
    const existinguser = await googleUserServices.getGoogleUser({email})
    if(existinguser !== null ){
        return res.status(200).json({
            message: "User already exists",
            success:true
        });
    }
    const user = await userServices.findUser({email})
    if(!user){
            return res.status(400).json({message: "email or password is invalid"});
    }
    const ismatch = await user.comparePassword(password, user.password)
    if(!ismatch){
        return res.status(400).json({message: "email or password is invalid"});
    }
    const token = user.generateToken();
    res.cookie('token',token);
    return res.status(200).json({
        message: "User Logged in",
        success:true
    });
}

module.exports.tokenUser = async (req,res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(500).json({ error: 'Token not found' });
        }
        res.status(200).json({ token });
    } catch (error) {
        return serverError(res,500)
    }
}

module.exports.verifyUser = async (req,res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(500).json({ error: 'No access token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'Token not found' });
        }
        const user = await userServices.findUser({email: decoded.email})
        if(!user)return res.status(500).json({
            message: "Server Error",
            success:true
        });
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ error: 'Token not found' });
    }
}

module.exports.logoutUser = async (req,res) => {
    try {
        res.cookie('token','');
        return res.status(201).json({
            message: "User Logout",
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
        return notFound(res,400);
    }
    try {
        let user = await userServices.findUserbyId({userId});
        if(!user){
            user = await googleServices.findUserbyId({userId});
            if(!user){
                return serverError(res,500);
            }
        }
        let follower = await userServices.findUserbyId2({id});
        if(!follower){
            follower = await googleServices.findUserbyId2({id});
            if(!follower){
                return serverError(res,500);
            }
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
        return serverError(res,500);
    };
};

module.exports.follower = async (req,res) => {
    const id = req.body
    try {
        const following = await userServices.findUserbyIds({id});
        const googlefollowing = await googleServices.findUserbyIds({id});
        const combined = [...following, ...googlefollowing];
        const sorted = combined.sort((a, b) =>
            a.name.split(' ')[0].localeCompare(b.name.split(' ')[0])
        );
        return res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
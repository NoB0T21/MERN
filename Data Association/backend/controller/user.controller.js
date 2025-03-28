import {generateToken} from '../middleware/cookies.js'
import { findUsers, createUsers} from "../services/user.service.js"
import bcrypt from 'bcrypt'; 


function notFound(res){
    return res.status(400).json({
        message: 'Bad Request',
        success: false
    })
}
function serverError(res){
    return res.status(404).json({
        message: 'server error',
        success: false
    });
};

export const createUser = async (req,res) => {
    const {name, username, email, password, image} = req.body
    
    if(!name || !username || !email || !password){
        return notFound(res)
    }
    try{
        const existingUser = await findUsers(email)
        if(existingUser){
            return res.status(200).json({
                message: 'user alresdy exits',
                success: false
            })
        };
        const user = await createUsers(name, username, email, password, image)
            if(!user){
                return serverError(res)
            }
            return res.status(201).json({
                message: "USer created",
                success:true
            })
    }catch(err){
        return serverError(res)
    }
}

export const loginUser = async (req,res) => {
    const {email, password} = req.body
    
    if(!email || !password){
        return notFound(res)
    }
    try{
        const User = await findUsers(email)
        if(!User){
            return res.status(200).json({
                message: 'invalid email or password',
                success: false
            })
        };
        const ismatch = await bcrypt.compare(password, User.password)
        if(!ismatch){
            return res.status(200).json({
                message: 'invalid email or password',
                success: false
            })
        }
        return res.status(201).json({
            message: "USer Login",
            success:true
        })
    }catch(err){
        return serverError(res)
    }
}

export const random = (req,res)=>{
    res.status(201).json({
        message: "USer Login",
        success:true
    })
}
export const getCookies = (req,res)=>{
        const token = req.cookies.token
        return res.status(201).json({
            token: token
        })
}

export const setCookies = async (req,res) => {
    const {email , name} = req.body
    if(!email){
        return notFound(res)
    }
    try{
        const token = await generateToken(email, name)
        if(!token)return serverError(res)
            
        res.cookie('token',token, {
            httpOnly: true
        })

        return res.status(201).json({
            token: token
        })
    }catch(err){
        return serverError(res)
    }
}
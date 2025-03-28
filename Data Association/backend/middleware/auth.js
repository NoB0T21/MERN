
import { verifyToken } from "./cookies.js";

export const auth = async(req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(201).json({
            token: ''
        })
    }
    try {
        const decoded = verifyToken(token);
        next()
    } catch (error) {
        return res.redirect('/')
    }
}

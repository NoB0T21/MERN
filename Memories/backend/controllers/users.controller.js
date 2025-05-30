const googleUserServices = require('../services/google.user.service');

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
    const existinguser = await googleUserServices.getGoogleUser({email,sub})
    if(existinguser){
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
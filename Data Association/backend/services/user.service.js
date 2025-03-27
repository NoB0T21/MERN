import userModels from '../models/user.model.js';
import bcrypt from 'bcrypt'; 

function errorHandling(err){
    throw new Error({
        message: "Database Failed",
        error: err
    });
    
}

export const findUsers = async (email) => {
    try{
       const user = await userModels.findOne({email});
       return user;
    }catch(err) {
        errorHandling();
    }
};

export const findusers = async (email) => {
    try{
       const user = await userModels.findOne({email});
       return user;
    }catch(err) {
        errorHandling();
    }
};

export const createUsers = async (name, username, email, password, image) => {
    const hash = await bcrypt.hash(password, 10);
    try{
       const user = await userModels.create({name, username, email, password: hash, image});
       return user;
    }catch(err) {
        errorHandling();
    }
};
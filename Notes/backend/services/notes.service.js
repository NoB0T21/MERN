import notesModel from '../models/notes.model.js'

function errorHandling(err){
    throw new Error({
        message: "Database Failed",
        error: err
    });
    
}

export const getnotes = async () => {
    try{
        const notes = await notesModel.find()
        return notes
    }catch(err){
        errorHandling(err)
    }
}

export const addnotes = async (title,details) => {
    try{
        const notes = await notesModel.create({title, details})
        return notes
    }catch(err){
        errorHandling(err)
    }
}

export const getnote23 = async (noteid) => {
    try{
        const notes = await notesModel.findOne({_id: noteid})
        return notes
    }catch(err){
        errorHandling(err)
    }
}

export const updatenotes = async (noteid,title,details) => {
    try{
        const notes = await notesModel.findOneAndUpdate({_id: noteid},{title, details})
        return notes
    }catch(err){
        errorHandling(err)
    }
}

export const deletenotes = async (noteid) => {
    try{
        const notes = await notesModel.findOneAndDelete({_id: noteid})
        return notes
    }catch(err){
        errorHandling(err)
    }
}
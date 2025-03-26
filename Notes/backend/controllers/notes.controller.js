import { addnotes, getnotes, getnote23, updatenotes, deletenotes } from "../services/notes.service.js"

function serverError(res){
    return res.status(500).json({
        message: "Server Error",
        success:false
    })
}

function notFoundError(res){
    return res.status(404).json({
        message: "Not found",
        success:false
    })
}

export const getNotes = async (req, res) => {
    try{
        const notes = await getnotes();
        if(!notes){
            notFoundError(res)
        }
        res.status(200).json(notes);
    }catch(err){
        serverError(res)
    }
}

export const addNotes = async (req, res) => {
    try{
        const {title, details} = req.body;
        if(!title){
            notFoundError(res)
        }
        const notes = await addnotes(title,details);
        if(!notes){
            notFoundError(res)
        }
        return res.status(200).json({
            message: "Note Added",
            success:true
        })
    }catch(err){
        serverError(res)
    }
}

export const getNote = async (req, res) => {
    const noteid = req.params.id
    try{
        const notes = await getnote23(noteid);
        if(!notes){
            notFoundError(res)
        }
        return res.status(200).json(notes);
    }catch(err){
        serverError(res)
    }
}

export const updateNote = async (req, res) => {
    const {title, details} = req.body;
    const noteid = req.params.id
    try{
        if(!title || !noteid){
            notFoundError(res)
        }
        const notes = await updatenotes(noteid,title,details);
        if(!notes){
            notFoundError(res)
        }
        return res.status(200).json({
            message: "Note Added",
            success:true
        })
    }catch(err){
        serverError(res)
    }
}

export const deleteNote = async (req, res) => {
    try{
        const noteid = req.params.id;
        if(!noteid){
            notFoundError(res)
        }
        const notes = await deletenotes(noteid);
        if(!notes){
            notFoundError(res)
        }
        return res.status(200).json({
            message: "Note Added",
            success:true
        })
    }catch(err){
        serverError(res)
    }
}
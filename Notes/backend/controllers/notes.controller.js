import { addnotes, getnotes, getnote23 } from "../services/notes.service.js"

export const getNotes = async (req, res) => {
    try{
        const notes = await getnotes();
        if(!notes){
            return res.json({
                message: "Server Error",
                success:false
            })
        }
        res.json(notes);
    }catch(err){
        return res.json({
            message: "Server Error",
            success:false
        })
    }
}

export const addNotes = async (req, res) => {
    try{
        const {title, details} = req.body;
        if(!title || !details){
            return res.json({
                message: "Required all field",
                success:false
            })
        }
        const notes = await addnotes(title,details);
        if(!notes){
            return res.json({
                message: "Server Error",
                success:false
            })
        }
        return res.json({
            message: "Note Added",
            success:true
        })
    }catch(err){
        return res.json({
            message: "Server Error",
            success:false
        })
    }
}

export const getNote = async (req, res) => {
    const noteid = req.params.id
    try{
        const notes = await getnote23(noteid);
        if(!notes){
            return res.json({
                message: "Server Error",
                success:false
            })
        }
        return res.json(notes);
    }catch(err){
        return res.json({
            message: "Server Error",
            success:false
        })
    }
}
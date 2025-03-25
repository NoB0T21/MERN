import notesModel from '../models/notes.model.js'

export const getnotes = async () => {
    const notes = await notesModel.find()
    return notes
}

export const addnotes = async (title,details) => {
    const notes = await notesModel.create({title, details})
    return notes
}

export const getnote23 = async (noteid) => {
    const notes = await notesModel.findOne({_id: noteid})
    return notes
}
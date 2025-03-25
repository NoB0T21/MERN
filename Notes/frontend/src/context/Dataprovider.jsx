import { createContext, useEffect, useState } from "react"
import  usenote from '../utils/api.js'

export const NotesContext = createContext()

const Dataprovider = ({children}) => {
    const [notesData, setNotesData] = useState([])
    const {getnote}=usenote(setNotesData)
    useEffect(()=>{
        getnote()
    },[])
    
  return (
    <div>
      <NotesContext.Provider value={[notesData, setNotesData]}>
        {children}
    </NotesContext.Provider>
    </div>
  )
}

export default Dataprovider

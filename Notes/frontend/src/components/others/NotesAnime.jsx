import {Suspense, useContext} from 'react'
import Notes from '../others/Notes';
import { AnimatePresence } from "framer-motion";
import { NotesContext } from '../../context/Dataprovider.jsx';

const NotesAnime =   (isvisible) => {
  const [notesData, setNotesData] = useContext(NotesContext)
  
  return (
    <div className='w-full flex flex-row p-10 g-6 '>
        {isvisible && (<AnimatePresence mode='sync'>
         {!notesData ? <h2 class="text-zinc-600">no task here</h2> : 
         <div className="box gap-5 w-full min-h-50 max-h-80 flex flex-wrap overflow-y-scroll">
           {notesData.map((e) => {
             return <Suspense id={e._id} key={e._id}><Notes e={e} /></Suspense>
           })}
         </div> }
    </AnimatePresence>)}
    </div>
  )
}

export default NotesAnime

import {Suspense, useContext} from 'react';
import Notes from '../others/Notes';
import { AnimatePresence } from "framer-motion";
import { NotesContext } from '../../context/Dataprovider.jsx';

const NotesAnime =   () => {
  const [notesData, setNotesData] = useContext(NotesContext);
  
  return (
    <div className='w-full flex flex-row p-10 g-6 '>
       {notesData.length<1 ? <h2 class="text-zinc-600">no task here</h2> : 
         <div className="scrool gap-5 w-full max-h-3/4 flex flex-wrap overflow-y-scroll">
           <AnimatePresence mode='popLayout'>
            {notesData.map((e) => {
              return <Suspense id={e._id} key={e._id}><Notes e={e} /></Suspense>
            })}
          </AnimatePresence>
         </div>}
    </div>
  );
};

export default NotesAnime;

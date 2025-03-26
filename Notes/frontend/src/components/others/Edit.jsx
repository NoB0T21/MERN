import { useContext, useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {api} from '../../utils/api.js';
import  usenote from '../../utils/api';
import { NotesContext } from '../../context/Dataprovider';

const Edit = () => {
    const [notesData, setNotesData] = useContext(NotesContext);
    const [note, setNote] = useState({});
    const params = useParams();
    
    const data = async () =>  {
        const dd = await api.get(`/read/${params._id}`)
        setNote(dd.data)
    };
    
    const deleteNote = () => {
            const response = api.delete(`/delete/${params._id}`);
            const {getnote} = usenote(setNotesData);
            getnote();
            if(!response)return;
            redirect('/');
        }

    useEffect(()=>{
        data();
    },[]);

    return (
        <div className="w-full h-auto flex  justify-start gap-6 py-10">
            <Link className="text-cyan-500 hover:text-cyan-300 text-md hover:scale-110 flex justify-start items-start transition-all duration-500 ease-in-out h-10" to="/">
                <svg width={24} height={24} fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
                    </svg>Home</Link>
            <div className="main mx-5 text-wrap flex flex-col gap-5 justify-between cursor-default w-1/2 min-auto bg-zinc-800 rounded-xl p-8 text-white">
                <div className='flex flex-col gap-4 justify-center'>
                    <h1 className="w-full text-2xl tracking-tighter flex justify-center items-center"> {note.title} </h1>
                    <h2 className="w-full text-xl">{note.details}</h2> 
                </div>
                <div className="w-full flex justify-end items-center">
                <button onClick={deleteNote} className="group1 text-zinc-400 hover:text-white hover:bg-red-500 hover:scale-110 text-md flex flex-col m-1 justify-center items-center transition-all duration-500 ease-in-out rounded-md p-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>Delete
                    </button>
                </div>
            </div>  
        </div>
    );
};

export default Edit;

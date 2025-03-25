import {Link} from 'react-router-dom'
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const Notes = (e) => {
  return (
            <AnimatePresence>
                <motion.div 
                className="task w-72 max-h-50 p-5 flex flex-col justify-between items-center rounded-md bg-zinc-800 hover:bg-zinc-700  hover:w-75 transition-all duration-500 ease-in-out"
                initial={{ y: -1000}}
                animate={{ y: 0}}
                exit={{ y: 1000}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <div className="w-full flex justify-between items-center">
                    <h2 className="text-white text-2xl tracking-tighter">{e.e.title}</h2>
                </div>
                <div className="w-full flex justify-between mt-3 items-center">
                    <Link className="text-blue-500 inline-block hover:text-blue-600" to={`/read/${e.e._id}`}>read More.. </Link>
                    <Link className="text-zinc-400 hover:text-yellow-600 flex m-2 justify-start items-center" to={`/edit/${e.e._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>edit</Link>
                </div>
            </motion.div>
            </AnimatePresence>

  )
}

export default Notes

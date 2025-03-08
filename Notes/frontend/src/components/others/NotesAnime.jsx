import React from 'react'
import Notes from '../others/Notes';
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const NotesAnime = (isvisible) => {
  return (
    <div>
        {isvisible && (<AnimatePresence mode='sync'>
          <motion.div
          className="box"
          initial={{ y: -200}}
          animate={{ y: 0}}
          exit={{ y: 1000}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Notes />
          </motion.div>
    </AnimatePresence>)}
    </div>
  )
}

export default NotesAnime

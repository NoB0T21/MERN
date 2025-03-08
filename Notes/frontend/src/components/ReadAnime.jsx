import React from 'react'
import Read from '../components/Read';
import { motion } from "motion/react";
import { AnimatePresence } from "framer-motion";

const ReadAnime = (visible = true) => {
  return (
    <div>
        {visible && (<AnimatePresence>
        <motion.div
          initial={{ y: -200}} // ✅ Fade in effect
          animate={{ y: 0}}
          exit={{ y: 1000}} // ✅ Smooth exit transition
          transition={{ duration: 1, ease:"easeInOut" }}
          >
            <Read />
        </motion.div>
    </AnimatePresence>)}
    </div>
  )
}

export default ReadAnime

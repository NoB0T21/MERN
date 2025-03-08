import React from 'react'
import Edit from '../others/Edit';
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const EditAnime = () => {
  return (
    <AnimatePresence>
    <motion.div
        className="box"
        initial={{ y: -200}} // ✅ Fade in effect
        animate={{ y: 0}}
        exit={{ y: 200}} // ✅ Smooth exit transition
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Edit />
          </motion.div>
    </AnimatePresence>
  )
}

export default EditAnime

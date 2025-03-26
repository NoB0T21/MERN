import { lazy } from 'react';
const Edit  = lazy(()=> import("./others/Edit"));
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const EditAnime = () => {
  return (
    <AnimatePresence>
      <motion.div
        className='w-full h-full'
          initial={{ y: -200}}
          animate={{ y: 0}}
          exit={{ y: 200}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
          <Edit />
        </motion.div>
    </AnimatePresence>
  );
};

export default EditAnime;

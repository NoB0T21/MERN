import { lazy } from 'react';
const Read = lazy(()=>import('../components/Read'));
import { motion } from "motion/react";
import { AnimatePresence } from "framer-motion";

const ReadAnime = (visible = true) => {
  return (
    <div>
        {visible && (
          <AnimatePresence>
            <motion.div
              initial={{ y: -200}}
              animate={{ y: 0}}
              exit={{ y: 1000}}
              transition={{ duration: 1, ease:"easeInOut" }}
              >
                <Read />
            </motion.div>
          </AnimatePresence>
        )}
    </div>
  );
};

export default ReadAnime;

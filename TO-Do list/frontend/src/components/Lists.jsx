import React, {lazy, useContext, Suspense } from 'react'
import {motion,AnimatePresence} from 'motion/react'
import {TodoContext} from '../context/DataProvider'
const Todo = lazy(() => import('./Todo'))
import BeatLoader from 'react-spinners/BeatLoader'


const Lists = () => {
  const [todoData, setTodoData] = useContext(TodoContext)
  
  return (
    <div className='bg-zinc-700 w-2/3 max-w-95 rounded-md p-2 flex flex-col justify-center items-center overflow-clip'>
      <Suspense fallback={<BeatLoader/>}>
        {
          todoData.length === 0 
          ?
          <AnimatePresence mode='wait'>
            <motion.div 
              className='bg-zinc-800 m-2 w-full h-13 rounded-md flex justify-center items-center'
              initial={{x:'-100%'}}
              animate={{x:0}}
                xit={{x:'100%'}}
              transition={{duration:0.3}}>
              <h2>No Task</h2>
            </motion.div>
          </AnimatePresence>
          :
          <AnimatePresence mode='popLayout'>
            {todoData.map((e) => {      
              return <Suspense 
                id={e._id}
                key={e._id} >
                  <Todo 
                    e={e}
                    className='bg-zinc-800 m-2 w-full h-13 px-3 rounded-md flex justify-between items-center'/>
              </Suspense>
            })}
          </AnimatePresence>
        }
      </Suspense>
    </div>
  )
}

export default Lists

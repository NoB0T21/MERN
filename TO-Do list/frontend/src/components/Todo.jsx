import React, { useContext } from 'react'
import {motion,AnimatePresence} from 'motion/react'
import {TodoContext} from '../context/DataProvider'
import useTodo from '../utils/api'
import toast, { Toaster } from 'react-hot-toast';


const Todo = ({e}) => {
    const [todoData, setTodoData] = useContext(TodoContext)

    const notify = (msg) => {
        setTimeout(() => {
          toast.custom((t) => (
            <AnimatePresence mode='wait'>  
              {t.visible ? (<motion.div 
                className={`max-w-75 w-full bg-[#222] shadow-lg rounded-lg pointer-events-auto flex relative`}
                initial={{x: 500}}
                animate={{x:0}}
                exit={{x:500}}
                transition={{duration:0.3}}>
                  <div className="flex-1 w-0 p-3 m-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-check-circle-fill text-green-600" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                      </div>
                      <h2 className=" text-md font-semibold text-white">
                        {msg}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className=" text-gray-400 hover:text-gray-300 absolute right-0 p-1 "
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                  </button>
                </motion.div>):''}
              </AnimatePresence>
            ),
            {duration: 1500,
            position: 'top-right',
            })
          }, 100);
        }

    const handleTask = (taskId) => {
        const {update} = useTodo(setTodoData);
        update(taskId,setTodoData)
        notify('Task completed good job 🤟🏼')
    }

    const deleteTask = (taskId) => {
        const {deleteTodo} = useTodo(setTodoData);
        deleteTodo(taskId,setTodoData)
        notify('hrllo')
    }

  return (
    <><motion.div 
        className='bg-zinc-800 m-2 w-full h-13 px-3 rounded-md flex justify-between items-center'
        initial={{x:'-100%'}}
        animate={{x:0}}
        exit={{x:'100%'}}
        transition={{duration:0.3}}>
            <div className='flex items-center gap-3'>
                {
                    e.done === true?
                    <div className=' cursor-not-allowed'>
                        <svg id='done' xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                        </svg>
                    </div>
                    :
                    <motion.button 
                    onClick={() => {
                        handleTask(e._id);
                    }}
                    whileHover={{scale:1.2}}
                    whileTap={{scale:0.5}}>
                        <svg id='done1' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        </svg>
                    </motion.button>
                }
                {
                    e.done === true ?
                    <h2 className='text-gray-500 line-through' >{e.task}</h2>:<h2>{e.task}</h2>
                }
            </div>
            <motion.div
                whileHover={{scale:1.2}}
                whileTap={{scale:0.5}}
                onClick={() => {
                    deleteTask(e._id);
                }}>
                <svg id='trash' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
            </motion.div>
        </motion.div>
        <Toaster/></>
  )
}

export default Todo

import React, {useContext, useState } from 'react'
import {TodoContext} from '../context/DataProvider'
import useTodo from '../utils/api'
import toast, { Toaster } from 'react-hot-toast';
import {motion, AnimatePresence} from 'motion/react'



const Form = () => {
  const [todoData, setTodoData] = useContext(TodoContext)
  const [task, setTask] = useState('')

  const notify = () => {
    setTimeout(() => {
      toast.custom((t) => (
        <AnimatePresence wait>  
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
                    Successfully created Task 
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

  const submitHandler = async (e) => {
      e.preventDefault()
      const {addTodo} = useTodo(setTodoData);
      const todoData1 = {task: task}
      addTodo(todoData1, setTask, setTodoData)
      notify()
    }
    
  return (
      <div className=' bg-zinc-700 w-2/3 max-w-95 rounded-xs p-2'>
        <form onSubmit={submitHandler} className='flex justify-center items-center gap-2'>
          <input onChange={(e) => {setTask(e.target.value)}} value={task} className='block bg-zinc-800 w-full h-10 px-3 py-5 rounded-md' type="text" name='task' placeholder='Enter Task' />
          <button className='bg-indigo-500 w-30 h-10 rounded-md '>Add Task</button>
        </form>
        <Toaster/>
      </div>
  )
}

export default Form

import React, {useContext, useState } from 'react'
import {TodoContext} from '../context/DataProvider'
import useTodo from '../utils/api'
import {toast,ToastContainer} from 'react-toastify'

const Form = () => {
  const [todoData, setTodoData] = useContext(TodoContext)
  const [task, setTask] = useState('')

  function success (){
    toast.success('Successfully created task', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const submitHandler = async (e) => {
      e.preventDefault()
      const {addTodo} = useTodo(setTodoData);
      const todoData1 = {task: task}
      addTodo(todoData1, setTask, setTodoData)
      
    }
    
  return (
      <div className=' bg-zinc-700 w-1/3 rounded-md p-2'>
        <ToastContainer/>
        <form onSubmit={submitHandler} className='flex justify-center items-center gap-2'>
          <input onChange={(e) => {setTask(e.target.value)}} value={task} className='block bg-zinc-800 w-full h-10 px-3 py-5 rounded-md' type="text" name='task' placeholder='Enter Task' />
          <button onClick={success} className='bg-indigo-500 w-30 h-10 rounded-md '>Add Task</button>
        </form>
      </div>
  )
}

export default Form

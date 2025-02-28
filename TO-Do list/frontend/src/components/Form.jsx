import React, { useContext, useState } from 'react'

import axios from 'axios'

const Form = () => {
    const [task, setTask] = useState('')


    const submitHandler = async (e) => {
        e.preventDefault()

        const todoData = {task: task}

        const response = await axios.post(`${import.meta.env.VITE_URL}/createtask`, todoData)
        const Data = response.data
        

        setTask('')
        location.reload()
    }
  return (
    <div className=' bg-zinc-700 w-1/3 rounded-md p-2'>
      <form onSubmit={submitHandler} className='flex justify-center items-center gap-2'>
        <input onChange={(e) => {setTask(e.target.value)}} value={task} className='block bg-zinc-800 w-full h-10 px-3 py-5 rounded-md' type="text" name='task' placeholder='Enter Task' />
        <button className='bg-indigo-500 w-30 h-10 rounded-md '>Add Task</button>
      </form>
    </div>
  )
}

export default Form

import React, {useEffect, useState } from 'react'
import axios from 'axios'

const Lists = () => {
    const [todoData, setTodoData] = useState([])
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}/`)
        .then(result => {setTodoData(result.data)})
        .catch(err => console.log(err))
    },[])

    const handleTask = (taskId) => {
        axios.post(`${import.meta.env.VITE_URL}/update/${taskId}`)
        
        location.reload()
    }
    const deleteTask = (taskId) => {
        axios.post(`${import.meta.env.VITE_URL}/delete/${taskId}`)
        
        location.reload()
    }

  return (
    <div className='bg-zinc-700 w-1/3 rounded-md p-2 flex flex-col justify-center items-center'>
        {
            todoData.length === 0 
            ?
            <div className='bg-zinc-800 m-2 w-full h-13 rounded-md flex justify-center items-center'>
               <h2>No Task</h2>
            </div>
            :
            todoData.map((e, idx) => {
              return  <div key={idx} className='bg-zinc-800 m-2 w-full h-13 px-3 rounded-md flex justify-between items-center'>
                        <div className='flex items-center gap-3'>
                            {
                                e.done === true?
                                <div>
                                    <svg id='done' xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                                </svg>
                                </div>
                                :
                                <div onClick={() => {
                                    handleTask(e._id);
                                  }}>
                                    <svg id='done1' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-square" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                    </svg>
                                </div>
                            }
                        {
                            e.done === true ?
                            <h2 className='text-gray-500 line-through' >{e.task}</h2>:<h2>{e.task}</h2>
                        }
                        </div>
                        <div onClick={() => {
                            deleteTask(e._id);
                        }}>
                            <svg id='trash' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </div>
                    </div>
            })
            
        }

    </div>
  )
}

export default Lists

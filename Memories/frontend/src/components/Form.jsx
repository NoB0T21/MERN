import React, { useState } from 'react'
import axios from 'axios'

const Form = () => {
    const [creator, setCreator] = useState('')
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [tags, setTags] = useState('')
    const [file, setFile] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()

        const response = await axios.post(`/createPost`)
           const data = response.data
          console.log(data)


        setCreator('')
        setTitle('')
        setMessage('')
        setTags('')
        setFile('')
    }
    const clear = () => {
        setCreator('')
        setTitle('')
        setMessage('')
        setTags('')
        setFile('')
    }

  return (
    <div className='bg-zinc-600 rounded-sm w-1/3 m-5 p-3 flex flex-col justify-center items-center gap-3'>
      <h2 className=' text-2xl font-semibold mb-3'>Create a Memory</h2>
      <form onSubmit={submitHandler} className='flex flex-wrap justify-center flex-col gap-2'>
        <input onChange={(e) => {setCreator(e.target.value)}} value={creator} className="block w-[97%] py-3 px-4 mx-[10px] bg-zinc-800 outline-none rounded-md" type="text" name="creator" placeholder="Creator"/>
        <input onChange={(e) => {setTitle(e.target.value)}} value={title} className="block w-[97%] py-3 px-4 mx-[10px] bg-zinc-800 outline-none rounded-md" type="text" name="title" placeholder="Title"/>
        <input onChange={(e) => {setMessage(e.target.value)}} value={message} className="block w-[97%] py-3 px-4 mx-[10px] bg-zinc-800 outline-none rounded-md" type="text" name="message" placeholder="Message"/>
        <input onChange={(e) => {setTags(e.target.value)}} value={tags} className="block w-[97%] py-3 px-4 mx-[10px] bg-zinc-800 outline-none rounded-md" type="text" name="tags" placeholder="Tags"/>
        <input onChange={(e) => {setFile(e.target.value)}} value={file} className="block w-[97%] py-3 px-4 mx-[10px] rounded-md bg-zinc-800" type="file" name="file"/>
        <button className='bg-indigo-600 py-3 px-4 mx-[10px] rounded-md hover:outline-2 outline-indigo-600 focus:indigo-700'>Submit</button>
      </form>
        <button onClick={clear} className='bg-red-400 py-1 px-4 mx-[10px] rounded-md hover:outline-2 outline-red-400 focus:bg-red-500'>Clear</button>
    </div>
  )
}

export default Form
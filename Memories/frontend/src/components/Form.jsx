import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const Form = () => {
  const [creator, setCreator] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [tags, setTags] = useState('')
  const [files, setFiles] = useState([]);

  const notify = () => toast.success('Post created Sucessfully', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  const error1 = (err) => toast.error(`${err}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });;
    const war = () => toast.warn('Atleast image field is require', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

  const changeFiles = (e) => {
    setFiles(e.target.files[0]);
  };
  const uploadFiles = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      war()
      return;
    }
    const formData = new FormData();
    formData.append("creator", creator)
    formData.append("title", title)
    formData.append("message", message)
    formData.append("tags", tags);
    formData.append("file", files);
    
  
    try {
      const response = axios.post(`${import.meta.env.VITE_BASE_URL}/upload`,
        formData, 
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      
      if(response === undefined){
        const err = 'server is closed'
        error1(err)
      }else{
        notify()
      }
    } catch (error) {
      error1(error.message)
    }
    
    setCreator('')
    setTitle('')
    setMessage('')
    setTags('')
    setFiles([]);
  };

  const clear = (e) => {
    e.preventDefault();
    setCreator('')
    setTitle('')
    setMessage('')
    setTags('')
    setFiles([]);
}

  return (
    <div className='bg-zinc-600 rounded-sm w-120 max-w-150 h-140 max-h-150 m-1 mt-5 p-3 flex flex-col justify-center items-center gap-2'>
      <h2 className=' text-2xl font-semibold mb-3'>Create a Memory</h2>
      <form className="w-full p-3 flex flex-col justify-center items-center gap-3 text-white">
          <input onChange={(e) => {setCreator(e.target.value)}} value={creator} className=" w-[97%] py-3 px-4 mx-[10px] bg-zinc-800 outline-none rounded-md" type="text" name="creator" placeholder="Creator"/>
          <input onChange={(e) => {setTitle(e.target.value)}} value={title} className="w-[97%] py-3 px-4 mx-[10px] bg-zinc-800 outline-none rounded-md" type="text" name="title" placeholder="Title"/>
          <input onChange={(e) => {setMessage(e.target.value)}} value={message} className="w-[97%] py-3 px-4 mx-[10px] bg-zinc-800 outline-none rounded-md" type="text" name="message" placeholder="Message"/>
          <input onChange={(e) => {setTags(e.target.value)}} value={tags} className="w-[97%] py-3 px-4 mx-[10px] bg-zinc-800 outline-none rounded-md" type="text" name="tags" placeholder="Tags"/>
          <input onChange={changeFiles} className="bg-yellow-600 w-[97%] mt-3 p-2 mx-[10px] rounded-md" type="file" name="file" accept='image/*'/>
          <button onClick={uploadFiles} className="bg-indigo-500 hover:bg-indigo-700 w-full mt-3 p-2 rounded-md flex gap-2 items-center justify-center " type="submit" value="Upload"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
          </svg><h1 className=' text-[1.2rem] font-semibold'>Create Post</h1></button>
        <button onClick={clear} className="bg-red-400 hover:bg-red-600 w-full mt-3 p-2 rounded-md flex gap-2 items-center justify-center " type="submit" value="Upload"><h1 className=' text-[1.2rem] font-semibold'>Clear</h1></button>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Form

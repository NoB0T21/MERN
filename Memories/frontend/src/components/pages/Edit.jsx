import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../../utils/api.js'
import { ToastContainer, toast } from 'react-toastify';


const Edit = () => {
  const navigate = useNavigate()
  const [post, setPost] = useState([])

  const [creator, setCreator] = useState(`${post.creator}`)
    const [title, setTitle] = useState(`${post.title}`)
    const [message, setMessage] = useState(`${post.message}`)
    const [tags, setTags] = useState(`${post.tags}`)
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

  const getIdFromUrl = () => {
    const path = window.location.pathname; // Example: /profile/123
    const parts = path.split("/"); // Split by "/"
    return parts[2]; // Assuming id is at index 2
  };
  const id = getIdFromUrl();

  const getpost = async () => {
    const {data} = await api.get(`/edit/${id}`)
    setPost(data)

    setCreator(`${data.creator}`)
    setTitle(`${data.title}`)
    setMessage(`${data.message}`)
    setTags(`${data.tags}`)
  }

  const changeFiles = (e) => {
    setFiles(e.target.files[0]);
  };

  const uploadFiles = async (e) => {
    e.preventDefault();
    
    const formData =
    {"creator": creator,
    "title": title,
    "message": message,
    "tags": tags};
  
    try {
      const response = api.post(`${import.meta.env.VITE_BASE_URL}/update/${post._id}`,
        formData
      );
      
      if(response === undefined){
        const err = 'server is closed'
        error1(err)
      }else{
        notify()
      }
      navigate('/')
    } catch (error) {
      error1(error.message)
    }
    
    setCreator('')
    setTitle('')
    setMessage('')
    setTags('')
  };

  const clear = (e) => {
    e.preventDefault();
    navigate('/')
}

  useEffect(() => {
    getpost()
  }, [])

  return (
    <div className='w-screen flex h-full justify-between'>
      <div className=' bg-zinc-700 mt-5 flex flex-col justify-center rounded-md h-[55%] max-h-140 w-[45%] min-w-50 max-w-85 relative overflow-clip'>
        <img className='h-65 static object-cover rounded-md bg-black opacity-70' src={post.ImageUrl} />
        <div className=' absolute flex flex-col items-start justify-center top-2 left-5 text-white'>
          <div>{post.creator}</div>
          <div>{post.createdAt}</div>
        </div>
        <div className=' static flex justify-between px-2 py-2 mx-5 mt-1'>{post.tags}</div>
        <h1 className=' static text-2xl font-semibold flex justify-between px-2 py-2 mx-5'>{post.title}</h1>
        <div className=' text-xl font-medium flex px-2 mx-5'>{post.message}</div>
        <div className=' static px-2 py-3 flex justify-between'>
        </div>
      </div>
      <div className='bg-zinc-600 rounded-sm w-1/3 max-w-110 m-5 mr-0 p-3 flex flex-col justify-center items-center gap-2'>
      <h2 className=' text-2xl font-semibold mb-3'>Create a Memory</h2>
      <form className="w-full p-3 flex flex-col justify-center items-center gap-3 text-white">
          <input onChange={(e) => {setCreator(e.target.value)}} value={creator} className=" w-[97%] py-3 px-4 mx-[10px] bg-zinc-800 outline-none rounded-md" type="text" name="creator" placeholder="Creator"/>
          <input onChange={(e) => {setTitle(e.target.value)}} value={title} className="w-[97%] py-3 px-4 mx-[10px] bg-zinc-800 outline-none rounded-md" type="text" name="title" placeholder="Title"/>
          <input onChange={(e) => {setMessage(e.target.value)}} value={message} className="w-[97%] py-3 px-4 mx-[10px] bg-zinc-800 outline-none rounded-md" type="text" name="message" placeholder="Message"/>
          <input onChange={(e) => {setTags(e.target.value)}} value={tags} className="w-[97%] py-3 px-4 mx-[10px] bg-zinc-800 outline-none rounded-md" type="text" name="tags" placeholder="Tags"/>
          <button onClick={uploadFiles} className="bg-indigo-500 hover:bg-indigo-700 w-full mt-3 p-2 rounded-md flex gap-2 items-center justify-center " type="submit" value="Upload">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
            <h1 className=' text-[1.2rem] font-semibold'>Edit Post</h1></button>
        <button onClick={clear} className="bg-red-400 hover:bg-red-600 w-full mt-3 p-2 rounded-md flex gap-2 items-center justify-center " type="submit" value="Upload"><h1 className=' text-[1.2rem] font-semibold'>Cancle</h1></button>
        </form>
        <ToastContainer/>
    </div>
    </div>
  )
}

export default Edit

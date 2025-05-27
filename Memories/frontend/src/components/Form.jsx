import { useContext, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { DataContext } from '../context/DataProvider';
import useData from '../utils/api.js';
import {z} from 'zod';
import { PulseLoader } from "react-spinners";

const formSchema = z.object({
  creator: z.string().min(1,'Name Required'),
  files: z.instanceof(File).refine((file) => file.size < 30 * 1024 * 1024, 'File size must be less than 30MB'),
});

const Form = () => {
  const [postData, setPostData] = useContext(DataContext);
  const [creator, setCreator] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState('');
  const [progress, setProgress] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState({});
  const [show, setShow] = useState(false);
  const [isloding, SetIsloding] = useState(false);

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

  const changeFiles = (e) => {
    setFiles(e.target.files[0]);
  };

  const uploadFiles = async (e) => {
    e.preventDefault();
    const parserResult = formSchema.safeParse({creator,files});
    if(!parserResult.success){
      const errorMessage = parserResult.error.flatten().fieldErrors;
      setError({
        creator: errorMessage.creator,
        files: errorMessage.files
      });
    };
    if (files.length === 0) {
      war();
      return;
    };

    SetIsloding(true);
    const formData = new FormData();
    formData.append("creator", creator);
    formData.append("title", title);
    formData.append("message", message);
    formData.append("tags", tags);
    formData.append("file", files);
    
  
    if(files.length  !== 0){
      try {
        const response = axios.post(`${import.meta.env.VITE_BASE_URL}/upload`,
          formData, 
          { headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progresss = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(progresss)
          }}
        );
        
        setTimeout(() => {
          const {getData}=useData(setPostData);
          getData();
          getData();
        },3000);
        
        if(response === undefined){
          const err = 'server is closed';
          error1(err);
          SetIsloding(false);
        }else{
          notify();
        }
      } catch (error) {
        error1(error.message);
        SetIsloding(false);
      } finally{
        setCreator('');
        setTitle('');
        setMessage('');
        setTags('');
        setFiles([]);
        setError({});
        setShow(false);
        SetIsloding(false);
        setProgress('');
      }
    }
  };

  const clear = (e) => {
    e.preventDefault();
    setCreator('');
    setTitle('');
    setMessage('');
    setTags('');
    setFiles([]);
    setError({});
}

  return (
    <>
      <div className='hidden md:flex flex-col justify-center items-center gap-2 bg-zinc-600 m-1 mt-5 p-3 rounded-sm w-90 max-w-130 h-140 max-h-150'>
        <h2 className='my-3 font-semibold text-2xl'>Create a Memory</h2>
        <form className="flex flex-col justify-center items-center gap-3 p-2 w-full text-white">
          {error.creator === ''? '': <p className='text-red-500 text-sm'>{error.creator}</p>}
          <input onChange={(e) => {setCreator(e.target.value)}} value={creator} className="bg-zinc-800 mx-[10px] px-4 py-3 rounded-md outline-none w-[97%]" type="text" name="creator" placeholder="Creator"/>
          <input onChange={(e) => {setTitle(e.target.value)}} value={title} className="bg-zinc-800 mx-[10px] px-4 py-3 rounded-md outline-none w-[97%]" type="text" name="title" placeholder="Title"/>
          <input onChange={(e) => {setMessage(e.target.value)}} value={message} className="bg-zinc-800 mx-[10px] px-4 py-3 rounded-md outline-none w-[97%]" type="text" name="message" placeholder="Message"/>
          <input onChange={(e) => {setTags(e.target.value)}} value={tags} className="bg-zinc-800 mx-[10px] px-4 py-3 rounded-md outline-none w-[97%]" type="text" name="tags" placeholder="Tags"/>
          {error.files === ''? '': <p className='text-red-500 text-sm'>{error.files}</p>}
          <input onChange={changeFiles} className="bg-yellow-600 mx-[10px] p-2 rounded-md w-[97%]" type="file" name="file" accept='image/*'/>
          <button disabled={isloding} onClick={uploadFiles} className="flex justify-center items-center gap-2 bg-indigo-500 hover:bg-indigo-700 mt-2 p-1 rounded-md w-full" type="submit" value="Upload">
            {isloding && <><PulseLoader color="#fff"/><p>{progress}%</p></>}
            {!isloding && <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
              </svg><h1 className='font-semibold text-[1.1rem]'>Create Post</h1>
            </>}
          </button>
          <button onClick={clear} className="flex justify-center items-center gap-2 bg-red-400 hover:bg-red-600 mt-3 p-2 rounded-md w-full" type="submit" value="Upload"><h1 className='font-semibold text-[1.2rem]'>Clear</h1></button>
        </form>
        <ToastContainer/>
      </div>
      <div className='md:hidden bottom-0 absolute flex justify-center items-center bg-zinc-600 p-3 rounded-t-sm w-full h-14 max-h-18 overflow-hidden'>
        <button className='flex justify-center items-center' onClick={() => setShow(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
        </button>
      </div>
      <div className={`${show ? "top-0" : "top-500"} absolute bg-[#19191c] w-full h-full transition-(top) duration-300 ease-in-ou`}>
        <div className='flex justify-end'>
          <button onClick={() => setShow(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </button>
        </div>
        <div className='flex flex-col justify-center items-center gap-2 mt-5 p-3 rounded-sm w-full h-140 max-h-150'>
          <h2 className='my-3 font-semibold text-2xl'>Create a Memory</h2>
          <form className="flex flex-col justify-center items-center gap-3 p-2 w-full text-white">
            {error.creator === ''? '': <p className='text-red-500 text-sm'>{error.creator}</p>}
            <input onChange={(e) => {setCreator(e.target.value)}} value={creator} className="bg-zinc-700 mx-[10px] px-4 py-3 rounded-md outline-none w-[97%]" type="text" name="creator" placeholder="Creator"/>
            <input onChange={(e) => {setTitle(e.target.value)}} value={title} className="bg-zinc-700 mx-[10px] px-4 py-3 rounded-md outline-none w-[97%]" type="text" name="title" placeholder="Title"/>
            <input onChange={(e) => {setMessage(e.target.value)}} value={message} className="bg-zinc-700 mx-[10px] px-4 py-3 rounded-md outline-none w-[97%]" type="text" name="message" placeholder="Message"/>
            <input onChange={(e) => {setTags(e.target.value)}} value={tags} className="bg-zinc-700 mx-[10px] px-4 py-3 rounded-md outline-none w-[97%]" type="text" name="tags" placeholder="Tags"/>
            {error.files === ''? '': <p className='text-red-500 text-sm'>{error.files}</p>}
            <input onChange={changeFiles} className="bg-yellow-600 mx-[10px] p-2 rounded-md w-[97%]" type="file" name="file" accept='image/*'/>
            <button disabled={isloding} onClick={uploadFiles} className="flex justify-center items-center gap-2 bg-indigo-500 hover:bg-indigo-700 mt-2 p-1 rounded-md w-full" type="submit" value="Upload">
            {isloding && <PulseLoader color="#fff"/>}
            {!isloding && <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
              </svg><h1 className='font-semibold text-[1.1rem]'>Create Post</h1>
            </>}</button>
            <button onClick={clear} className="flex justify-center items-center gap-2 bg-red-400 hover:bg-red-600 mt-3 p-2 rounded-md w-full" type="submit" value="Upload"><h1 className='font-semibold text-[1.2rem]'>Clear</h1></button>
          </form>
          <ToastContainer/>
        </div>
      </div>
    </>
  )
};

export default Form;

import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { DataContext } from '../../context/DataProvider.jsx';
import { PulseLoader } from "react-spinners";
import {z} from 'zod';
import useData from '../../utils/api.js';
import axios from 'axios';
import {ImageFill, Upload, Upload2, Close} from '../Icons/Icons.jsx';

const formSchema = z.object({
  creator: z.string().min(1,'Name Required'),
  files: z.instanceof(File, { message: 'A valid file is required' }),
});

const Form = () => {
  const {setPostData} = useContext(DataContext);
  const [progress, setProgress] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState({
    creator:'',files:''
  });
  const [show, setShow] = useState(false);
  const [isloding, SetIsloding] = useState(false);
  const [formDatas, setFormData] = useState({
    creator:'',title:'',message:'',tags:''
  })

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
  const handlefile = (e) => {setFiles(e.target.files[0])}
  

  const uploadFiles = async (e) => {
    e.preventDefault();
    const parserResult = formSchema.safeParse({creator: formDatas.creator,files});
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

    if (parserResult.success) {
      setError({ creator: '', files: '' });
    }

    SetIsloding(true);
    const formData = new FormData();
    formData.append('creator', formDatas.creator);
    formData.append('title', formDatas.title);
    formData.append('message', formDatas.message);
    formData.append('tags', formDatas.tags);
    formData.append('file', files);
    
  
    if(files.length  !== 0){
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/upload`,
          formData, 
          { headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
           },
           withCredentials: true,
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
        setFiles([]);
        setError({creator:'',files:''});
        setShow(false);
        SetIsloding(false);
        setProgress('');
        setFormData({creator:'',title:'',message:'',tags:''})
      }
    }
  };

  const clear = (e) => {
    e.preventDefault();
    setFiles([]);
    setError({creator:'',files:''});
    setShow(false);
    SetIsloding(false);
    setProgress('');
    setFormData({creator:'',title:'',message:'',tags:''})
}

  return (
    <>
      <div className='hidden shadow-xl md:flex flex-col justify-center items-center gap-2 bg-zinc-600 mr-10 md:mr-20 2xl:mr-55 xl:mr-25 mt-5 p-3 rounded-md w-75 lg:w-90 max-w-130 h-125 xl:h-120 max-h-150'>
        <h2 className='font-semibold text-2xl'>Create a Memory</h2>
        <form className="flex flex-col justify-center items-center gap-3 px-2 w-full text-white">
          {error.creator === ''? '': <p className='text-red-500 text-sm'>{error.creator}</p>}
          <div className="relative w-full">
            <input onChange={(e) => {setFormData({...formDatas, creator: e.target.value})}} value={formDatas.creator} required autoComplete="off"
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
            <label className="left-4 absolute bg-zinc-800 px-1 border border-zinc-800 rounded-sm peer-focus:border-indigo-500  text-gray-400 peer-focus:text-[#fff] peer-valid:text-[#fff] text-md scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Creator</span>
            </label>
          </div>
          <div className="relative w-full">
            <input onChange={(e) => {setFormData({...formDatas, title: e.target.value})}} value={formDatas.title} required autoComplete="off"
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
            <label className="left-4 absolute bg-zinc-800 px-1 border border-zinc-800 rounded-sm peer-focus:border-indigo-500  text-gray-400 peer-focus:text-[#fff] peer-valid:text-[#fff] text-md scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Title</span>
            </label>
          </div>
          <div className="relative w-full">
            <input onChange={(e) => {setFormData({...formDatas, message: e.target.value})}} value={formDatas.message} required autoComplete="off"
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
            <label className="left-4 absolute bg-zinc-800 px-1 border border-zinc-800 rounded-sm peer-focus:border-indigo-500  text-gray-400 peer-focus:text-[#fff] peer-valid:text-[#fff] text-md scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Message</span>
            </label>
          </div>
          <div className="relative w-full">
            <input onChange={(e) => {setFormData({...formDatas, tags: e.target.value})}} value={formDatas.tags} required autoComplete="off"
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
            <label className="left-4 absolute bg-zinc-800 px-1 border border-zinc-800 rounded-sm peer-focus:border-indigo-500  text-gray-400 peer-focus:text-[#fff] peer-valid:text-[#fff] text-md scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Tags</span>
            </label>
          </div>
          {error.files === ''? '': <p className='text-red-500 text-sm'>{error.files}</p>}
          <button className='shadow-lg flex w-full h-10 py-1 lg:py-2 text-xl font-semibold relative gap-2 justify-center items-center bg-indigo-700 text-[#fff] px-1 overflow-hidden z-1 transition-all duration-300 before:absolute before:h-full before:w-0 before:bg-indigo-600 before:-z-1 before:transition-all before:duration-350 hover:before:w-full'><ImageFill/> upload <input onChange={handlefile} className="w-full h-full absolute opacity-0 cursor-pointer" type="file" name="file" accept='image/*'/></button>
          <button disabled={isloding} onClick={uploadFiles} className="flex shadow-lg relative justify-center items-center gap-2 bg-indigo-700 mt-2 p-1 xl:p-2 rounded-md w-full overflow-hidden z-1 transition-all duration-300 before:absolute before:h-full before:w-0 before:bg-indigo-600 before:-z-1 before:transition-all before:duration-350 hover:before:w-full" type="submit" value="Upload">
            {isloding && <><PulseLoader color="#fff"/><p>{progress}%</p></>}
            {!isloding && <>
              <Upload/><h1 className='font-semibold text-[1.1rem]'>Create Post</h1>
            </>}
          </button>
          <button onClick={clear} className="flex shadow-lg justify-center items-center gap-2 shadow-red-xl/30 bg-red-500 mt-1 p-1 rounded-md w-full relative overflow-hidden z-1 transition-all duration-300 before:absolute before:h-full before:w-0 before:bg-red-400 before:-z-1 before:transition-all before:duration-350 hover:before:w-full" type="submit" value="Upload"><h1 className='font-semibold text-[1.2rem]'>Clear</h1></button>
        </form>
        <ToastContainer/>
      </div>
      <div className='md:hidden bottom-0 absolute flex justify-center items-center bg-zinc-600 rounded-t-sm w-screen h-14 max-h-18 overflow-hidden'>
        <button className='flex justify-center items-center' onClick={() => setShow(true)}>
          <Upload2/>
        </button>
      </div>
      <div className={`${show ? "top-0" : "top-500"} absolute bg-[#19191c] w-full h-full transition-(top) duration-300 ease-in-ou`}>
        <div className='flex justify-end'>
          <button onClick={() => setShow(false)}>
            <Close/>
          </button>
        </div>
        <div className='flex flex-col justify-center items-center gap-2 px-3 rounded-sm w-full h-110'>
          <h2 className='my-3 font-semibold text-2xl'>Create a Memory</h2>
          <form className="flex flex-col justify-center items-center gap-3 p-2 w-full text-white">
            {error.creator === ''? '': <p className='text-red-500 text-sm'>{error.creator}</p>}
            <div className="relative w-full">
            <input onChange={(e) => {setFormData({...formDatas, creator: e.target.value})}} value={formDatas.creator} required autoComplete="off"
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
            <label className="left-4 absolute bg-zinc-800 px-1 border border-zinc-800 rounded-sm peer-focus:border-indigo-500  text-gray-400 peer-focus:text-[#fff] peer-valid:text-[#fff] text-md scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Creator</span>
            </label>
          </div>
          <div className="relative w-full">
            <input onChange={(e) => {setFormData({...formDatas, title: e.target.value})}} value={formDatas.title} required autoComplete="off"
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
            <label className="left-4 absolute bg-zinc-800 px-1 border border-zinc-800 rounded-sm peer-focus:border-indigo-500  text-gray-400 peer-focus:text-[#fff] peer-valid:text-[#fff] text-md scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Title</span>
            </label>
          </div>
          <div className="relative w-full">
            <input onChange={(e) => {setFormData({...formDatas, message: e.target.value})}} value={formDatas.message} required autoComplete="off"
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
            <label className="left-4 absolute bg-zinc-800 px-1 border border-zinc-800 rounded-sm peer-focus:border-indigo-500  text-gray-400 peer-focus:text-[#fff] peer-valid:text-[#fff] text-md scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Message</span>
            </label>
          </div>
          <div className="relative w-full">
            <input onChange={(e) => {setFormData({...formDatas, tags: e.target.value})}} value={formDatas.tags} required autoComplete="off"
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
            <label className="left-4 absolute bg-zinc-800 px-1 border border-zinc-800 rounded-sm peer-focus:border-indigo-500  text-gray-400 peer-focus:text-[#fff] peer-valid:text-[#fff] text-md scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Tags</span>
            </label>
          </div>
            {error.files === ''? '': <p className='text-red-500 text-sm'>{error.files}</p>}
            <button className='shadow-lg flex w-full h-10 py-1 lg:py-2 text-xl font-semibold relative gap-2 justify-center items-center bg-indigo-700 text-[#fff] px-1 overflow-hidden z-1 transition-all duration-300 before:absolute before:h-full before:w-0 before:bg-indigo-600 before:-z-1 before:transition-all before:duration-350 hover:before:w-full'><ImageFill/> upload <input onChange={handlefile} className="w-full h-full absolute opacity-0 cursor-pointer" type="file" name="file" accept='image/*'/></button>
            <button disabled={isloding} onClick={uploadFiles} className="flex shadow-lg relative justify-center items-center gap-2 bg-indigo-700 mt-2 p-1 xl:p-2 rounded-md w-full overflow-hidden z-1 transition-all duration-300 before:absolute before:h-full before:w-0 before:bg-indigo-600 before:-z-1 before:transition-all before:duration-350 hover:before:w-full" type="submit" value="Upload">
            {isloding && <PulseLoader color="#fff"/>}
            {!isloding && <>
              <Upload/><h1 className='font-semibold text-[1.1rem]'>Create Post</h1>
            </>}</button>
            <button onClick={clear} className="flex shadow-lg justify-center items-center gap-2 shadow-red-xl/30 bg-red-500 mt-1 p-1 rounded-md w-full relative overflow-hidden z-1 transition-all duration-300 before:absolute before:h-full before:w-0 before:bg-red-400 before:-z-1 before:transition-all before:duration-350 hover:before:w-full" type="submit" value="Upload"><h1 className='font-semibold text-[1.2rem]'>Clear</h1></button>
          </form>
          <ToastContainer/>
        </div>
      </div>
    </>
  )
};

export default Form;
